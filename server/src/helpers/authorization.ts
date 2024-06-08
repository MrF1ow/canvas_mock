// Packages
import * as jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Local Imports
import { MESSAGE_AUTHENTICATION_ERROR, MESSAGE_UNAUTHORIZED_ERROR } from '../config/messages';
import { SALT_WORK_FACTOR, USER_ROLE } from '../config';
import { Environment } from './environment';

// Types
import {
  Middleware,
  ServerRequest,
  ServerResponse,
  TokenData,
} from '../types';
import { PublicUser, User } from '@/types/tables';
import { Handler } from '../handlers/handler';

/**
 * Generates and encrypts an authorization token.
 *
 * @param {string} user User ID.
 */
export const generateToken = (user: string): string => {
  const payload = {
    sub: user,
  } as TokenData;

  return jsonwebtoken.sign(
    payload,
    Environment.getSecret(),
    {
      expiresIn: '24h',
    },
  )
};

/**
 * Decodes a signed token.
 *
 * @param {string} token Signed token.
 * @returns {TokenData} Data from token.
 */
export const decodeToken = (token: string): TokenData => {
  return jsonwebtoken.verify(
    token,
    Environment.getSecret(),
  ) as TokenData;
};

/**
 * Hashes a password before insertion.
 *
 * @param {string} password Plain-text password.
 * @returns {string} Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  const hash = await bcrypt.hash(
    password,
    salt,
  );

  return hash;
};

/**
 * Validates an incoming password against a vaild password.
 *
 * @param {string} valid Stored password.
 * @param {string} subject Password to test.
 * @returns {Promise<boolean>} Whether the passwords match.
 */
export const comparePassword = async (
  valid: string,
  subject: string,
): Promise<boolean> => {
  return bcrypt.compare(
    subject,
    valid,
  );
};

/**
 * Validates a request.
 *
 * @param {ServerRequest} req Incoming request.
 */
export const requiresAuthorization = async (
  req: ServerRequest,
  res: ServerResponse,
  next: Middleware,
): Promise<void> => {
  const authorizationHeader = (req.get('Authorization') || '').split(' ');
  const token = authorizationHeader[0] === 'Bearer' ? authorizationHeader[1] : null;

  try {
    const { sub } = decodeToken(token);
    req.user = sub;

    next();
  } catch (error) {
    res.status(401).send({
      error: MESSAGE_AUTHENTICATION_ERROR,
    });
  }
};

/**
 * Validates a request.
 *
 * @param {ServerRequest} req Incoming request.
 */
export const requiresAdmin = async (
  req: ServerRequest,
  res: ServerResponse,
  next: Middleware,
): Promise<void> => {
  const authorizationHeader = (req.get('Authorization') || '').split(' ');
  const token = authorizationHeader[0] === 'Bearer' ? authorizationHeader[1] : null;

  try {
    const { sub } = decodeToken(token);
    req.user = sub;

    const user = await Handler.getDatabase().users.findById(sub);

    if (user.role !== USER_ROLE.ADMIN) {
      res.status(403).send({
        error: MESSAGE_UNAUTHORIZED_ERROR,
      });
    }

    next();
  } catch (error) {
    res.status(401).send({
      error: MESSAGE_AUTHENTICATION_ERROR,
    });
  }
};

/**
 * Validates a request.
 *
 * @param {ServerRequest} req Incoming request.
 */
export const optionalAuthorization = async (
  req: ServerRequest,
  res: ServerResponse,
  next: Middleware,
): Promise<void> => {
  const authorizationHeader = (req.get('Authorization') || '').split(' ');
  const token = authorizationHeader[0] === 'Bearer' ? authorizationHeader[1] : null;

  try {
    const { sub } = decodeToken(token);
    req.user = sub;
  } catch (error) {
    req.user = null;
  }

  next();
};

/**
 * Cleans user data of private data.
 *
 * @param {User} user User to be cleaned. 
 * @returns {PublicUser} User public data.
 */
export const cleanUser = (user: User): PublicUser => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});
