// Packages
import {
  Db,
  MongoClient,
} from 'mongodb';

// Local Imports
import {
  AssignmentDataAccessObject,
  CourseDataAccessObject,
  EnrolledDataAccessObject,
  SubmissionDataAccessObject,
  UserDataAccessObject,
} from './daos';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { DataAccessObject } from './daos/dao';
import { AbstractDatabase } from '../abstract-database';
import { Environment } from '../../helpers/environment';
import { Monitor } from '../../helpers/monitor';
import DatabaseUrlMissingError from '../../errors/database-url-missing';

// Types
import { Assignment, Course, Enrolled, Submission, User } from '../../types/tables';

MongoClient.setMaxListeners(200);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends AbstractDatabase {
  /**
   * Reference to MongoClient.
   */
  protected _client: MongoClient | null;

  /**
   * Reference to database.
   */
  protected _db: Db | null;
 
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
    this._db = null;
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

    this._client = new MongoClient(authorizedUrl);

    await this._client.connect();

    this._db = this._client.db(Environment.getDatabaseName());

    (this.assignments as DataAccessObject<Assignment>).setDb(this._db);
    (this.courses as DataAccessObject<Course>).setDb(this._db);
    (this.enrolled as DataAccessObject<Enrolled>).setDb(this._db);
    (this.submissions as DataAccessObject<Submission>).setDb(this._db);
    (this.users as DataAccessObject<User>).setDb(this._db);

    if (this.isConnected()) {
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
    return (!!this._client);
  }
}
