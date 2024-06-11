// Packages
import mongoose, { connect, connection } from 'mongoose';
import { MongoClient } from 'mongodb';

// Local Imports
import {
  AssignmentDataAccessObject,
  CourseDataAccessObject,
  EnrolledDataAccessObject,
  SubmissionDataAccessObject,
  UserDataAccessObject,
} from './daos';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { AbstractDatabase } from '../abstract-database';
import { Environment } from '../../helpers/environment';
import { Monitor } from '../../helpers/monitor';
import { setupGridFs } from '../../helpers/grid';
import DatabaseUrlMissingError from '../../errors/database-url-missing';

mongoose.set('strictQuery', false);
mongoose.connection.setMaxListeners(20);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends AbstractDatabase {
  /**
   * Instantiates MongoDatabase with correct queries.
   */
  constructor() {
    super();

    this.assignments = new AssignmentDataAccessObject();
    this.courses = new CourseDataAccessObject();
    this.enrolled = new EnrolledDataAccessObject();
    this.submissions = new SubmissionDataAccessObject();
    this.users = new UserDataAccessObject();
    this.mongoClient = null;
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!Environment.getDatabaseUrl()) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = Environment.getDatabaseUrl()
      .replace('<user>', Environment.getDatabaseUser())
      .replace('<password>', Environment.getDatabasePassword())
      .replace('<host>', Environment.getDatabaseHost())
      .replace('<port>', `${Environment.getDatabasePort()}`);

<<<<<<< HEAD
=======

    this.mongoClient = await MongoClient.connect(authorizedUrl);

>>>>>>> main
    Monitor.log(
      MongoDatabase,
      `Connecting to ${authorizedUrl}`,
      Monitor.Layer.UPDATE,
    );

    // utilizing mongoose to connect to the database, no need for Express.js or external server
    await connect(
      authorizedUrl,
      {
        auth: {
          username: Environment.getDatabaseUser(),
          password: Environment.getDatabasePassword(),
        },
        dbName: 'business_db',
      }
    );

    if (this.isConnected()) {
      Monitor.log(
        MongoDatabase,
        MESSAGE_DATABASE_CONNECTION_SUCCESS,
        Monitor.Layer.UPDATE,
      );
    } else {
      Monitor.log(
        MongoDatabase,
        'Couldn\'t Connect',
        Monitor.Layer.WARNING,
      );
    }
  }

  client(): MongoClient {
    return mongoose.connection.getClient() as unknown as MongoClient;
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return connection && 'readyState' in connection
      ? connection.readyState === 1
      : false;
  }
}
