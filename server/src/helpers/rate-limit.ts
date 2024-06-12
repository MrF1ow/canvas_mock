// Types
import { MESSAGE_INTERNAL_SERVER_ERROR } from '@/config/messages';
import { Monitor } from './monitor';

// Types
import {
  Dictionary,
  Middleware,
  ServerRequest,
  ServerResponse,
} from '../types';

/**
 * Get rate limited son.
 */
export class RateLimiter {
  /**
   * IPs logged.
   */
  static ips = {} as Dictionary<number[]>;

  /**
   * Users logged.
   */
  static users = {} as Dictionary<number[]>;

  /**
   * Lets not run out of memory.
   */
  static cleanUp() {
    const minuteAgo = Date.now() - 60000;

    for (let ip in RateLimiter.ips) {
      RateLimiter.ips[ip] = RateLimiter.users[ip].filter((time: number) => {
        return time > minuteAgo;
      });

      if (!RateLimiter.ips[ip]) {
        delete RateLimiter.ips[ip];
      }
    }

    for (let user in RateLimiter.users) {
      RateLimiter.users[user] = RateLimiter.users[user].filter((time: number) => {
        return time > minuteAgo;
      });

      if (!RateLimiter.users[user]) {
        delete RateLimiter.users[user];
      }
    }
  }

  /**
   * Validates a request.
   *
   * @param {ServerRequest} req Incoming request.
   */
  static async rateLimit(
    req: ServerRequest,
    res: ServerResponse,
    next: Middleware,
  ): Promise<void> {
    try {
      // If they're logged in.
      if (req.user) {
        // If this is a subsequent request.
        if (req.user in RateLimiter.users) {
          // Remove old entries.
          const minuteAgo = Date.now() - 60000;
          RateLimiter.users[req.user] = RateLimiter.users[req.user].filter((time: number) => {
            return time > minuteAgo;
          });
        } else {
          RateLimiter.users[req.user] = [];
        }

        RateLimiter.users[req.user].push(Date.now());

        if (RateLimiter.users[req.user].length > 9) {
          res.status(429).send();
          return;
        }
      } else {
        // If this is a subsequent request.
        if (req.ip in RateLimiter.ips) {
          // Remove old entries.
          const minuteAgo = Date.now() - 60000;
          RateLimiter.ips[req.ip] = RateLimiter.ips[req.ip].filter((time: number) => {
            return time > minuteAgo;
          });
        } else {
          RateLimiter.ips[req.ip] = [];
        }

        RateLimiter.ips[req.ip].push(Date.now());

        if (RateLimiter.ips[req.ip].length > 9) {
          res.status(429).send();
          return;
        }
      }

      next();
    } catch (error) {
      Monitor.log(
        RateLimiter,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}