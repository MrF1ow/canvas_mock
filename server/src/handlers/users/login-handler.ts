// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';
import { comparePassword, generateToken } from '../../helpers/authorization';

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

      const { email, password } = req.body;

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

      const token = generateToken(user._id);

      res.status(200).send({
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
