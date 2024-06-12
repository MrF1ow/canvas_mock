// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  comparePassword,
  generateToken,
} from '../../helpers/authorization';
import { REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Authenticate a specific User with their email address and password.
 */
export class LoginHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/login',
    );
  }

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
  ): Promise<void> {
    try {

      const {
        email,
        password,
      } = req.body;

      // Check for all required parameters.
      if (!email) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'Email',
          ),
        });
        return;
      }
      if (!password) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'Password',
          ),
        });
        return;
      }

      const user = await Handler._database.users.findOne({ email });

      if (!user) {
        res.status(404).send({
          error: 'User not found.',
        });
        return;
      }

      if (!await comparePassword(user.password, password)) {
        res.status(401).send({
          error: 'Invalid password.',
        });
        return;
      }

      const token = generateToken(user.id);

      res.status(200).send({
        id: user.id,
        token,
      });


    } catch (error) {
      Monitor.log(
        LoginHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
