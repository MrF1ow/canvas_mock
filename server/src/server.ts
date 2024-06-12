// Packages
import express, { Express } from 'express';

// Local Imports
import {
  AssignmentRoutes,
  CourseRoutes,
  MediaRoutes,
  SubmissionRoutes,
  UserRoutes,
} from './handlers';
import { AbstractDatabase } from './database/abstract-database';
import { populateDatabase } from './utils/mock-data';
import { Environment } from './helpers/environment';
import { RateLimiter } from './helpers/rate-limit';
import { getDatabase } from './database';
import { Monitor } from './helpers/monitor';

/**
 * Wrapper around all the server layers.
 */
export class Server {
  /**
   * Static reference to the database layer.
   */
  protected static _database: AbstractDatabase;

  /**
   * Static reference to the express app.
   */
  protected static _app: Express;

  /**
   * Server constructor initializes layers.
   */
  constructor() {
    if (!Server._database) {
      Server._database = getDatabase();
    }
    
    this.stop();
  }

  /**
   * Starts the server.
   * 
   * @returns {Promise<void>} Promise of the action.
   */
  async start(): Promise<void> {
    await Server._database.connect();

    AssignmentRoutes.apply(Server._app);
    CourseRoutes.apply(Server._app);
    MediaRoutes.apply(Server._app);
    SubmissionRoutes.apply(Server._app);
    UserRoutes.apply(Server._app);

    if (Environment.useMockData()) {
      await populateDatabase(Server._database);
    }

    setInterval(
      RateLimiter.cleanUp,
      1000 * 60 * 10,
    );

    Server._app.listen(
      Environment.getServerPort(),
      () => {
        Monitor.log(
          Server,
          `Server is running on port ${Environment.getServerPort()}`,
          Monitor.Layer.SUCCESS,
        );
      },
    );
  }

  /**
   * Stops the server.
   * 
   * @returns {void} Promise of the action.
   */
  stop(): void {
    Server._app = express();
    Server._app.use(express.json());
  }
}
