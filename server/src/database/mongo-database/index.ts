// Packages
import mongoose from 'mongoose';
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
   * Reference to MongoClient.
   */
  protected _client: MongoClient | null;
 
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

    this._client = null;
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

    this._client = await MongoClient.connect(authorizedUrl);

    if (this.isConnected) {
      Monitor.log(
        MongoDatabase,
        MESSAGE_DATABASE_CONNECTION_SUCCESS,
        Monitor.Layer.UPDATE,
      );
    } else {
      Monitor.log(
        MongoDatabase,
        'Failure to connect.',
        Monitor.Layer.UPDATE,
      );
    }
  }

  /**
   * Retrieves MongoClient object.
   *
   * @returns {MongoClient | null} MongoClient object.
   */
  client(): MongoClient | null {
    return this._client;
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return mongoose.connection && 'readyState' in mongoose.connection
      ? mongoose.connection.readyState === 1
      : false;
  }
}
