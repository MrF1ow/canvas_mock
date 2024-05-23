// Packages
import mongoose, {
  connect,
  connection,
} from 'mongoose';

// Local Imports
import {
  AssignmentDataAccessObject,
  CourseDataAccessObject,
  EnrolledDataAccessObject,
  SubmissionDataAccessObject,
  UserDataAccessObject,
} from './daos';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { Database } from '../database';
import { Environment } from '../../helpers/environment';
import { Monitor } from '../../helpers/monitor';
import DatabaseUrlMissingError from '../../errors/database-url-missing';

mongoose.set('strictQuery', false);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends Database {
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
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!Environment.getDatabaseUrl()) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = Environment.getDatabaseUrl()
      .replace(
        '<user>',
        Environment.getDatabaseUser(),
      )
      .replace(
        '<password>',
        Environment.getDatabasePassword(),
      );

    await connect(authorizedUrl);

    Monitor.log(
      MongoDatabase,
      MESSAGE_DATABASE_CONNECTION_SUCCESS,
      Monitor.Layer.UPDATE,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return (connection && 'readyState' in connection) ? connection.readyState === 1 : false;
  }
}
