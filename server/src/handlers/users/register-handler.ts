// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AUTHORIZATION_TYPE, REQUEST_TYPE } from '../../config';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';
import { hashPassword, generateToken } from '../../helpers/authorization';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Create and store a new application User with specified data and adds it to the application's database.  
 * Only an authenticated User with 'admin' role can create users with the 'admin' or 'instructor' roles.
 */
export class RegisterHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/',
      AUTHORIZATION_TYPE.OPTIONAL,
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

      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        res.status(400).send({
          error: 'Missing required fields: name, email, and password are required.',
        });
        return;
      }

      const validRoles = ['admin', 'instructor', 'student']; 
      if (role && !validRoles.includes(role)) {
        res.status(400).send({
          error: `Invalid role. Valid roles are: ${validRoles.join(', ')}.`,
        });
        return;
      }

      const creatorId = req.user ?? null;
      let creatorRole : string | null = null;
      if (creatorId) {
        const creator = await Handler.getDatabase().users.findById(creatorId);
        creatorRole = creator.role;
      }
      
      if (role && ['admin', 'instructor'].includes(role) && creatorRole !== 'admin') {
        res.status(403).send({
          error: 'Only admins can create admin or instructor roles.',
        });
        return;
      }

      await Handler._database.users.insert({
        name,
        email,
        password,
        role: role ?? 'student',
      });

      const user = await Handler._database.users.findOne({ 
        email,
        name, 
      });

      res.status(200).send({
        id: user._id,
      });



    } catch (error) {
      Monitor.log(
        RegisterHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
