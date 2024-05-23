/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  Assignment,
  Course,
  Enrolled,
  Submission,
  User,
} from '../types';
import { DataAccessObjectInterface } from '../types/database';
import UsedAbstractDatabaseError from '../errors/used-abstract-database-error';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Assignments.
   */
  assignments: DataAccessObjectInterface<Assignment> = new DataAccessObject<Assignment>();

  /**
   * Data access object for Courses.
   */
  courses: DataAccessObjectInterface<Course> = new DataAccessObject<Course>();

  /**
   * Data access object for Submissions.
   */
  submissions: DataAccessObjectInterface<Submission> = new DataAccessObject<Submission>();

  /**
   * Data access object for Users.
   */
  users: DataAccessObjectInterface<User> = new DataAccessObject<User>();

  /**
   * Data access object for Enrolleds.
   */
  enrolled: DataAccessObjectInterface<Enrolled> = new DataAccessObject<Enrolled>();

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected(): boolean {
    return false;
  }

  /**
   * Get's a data access object.
   * 
   * @param {string} name Name of data access object.
   * @returns {DataAccessObjectInterface} Data access object.
   */
  getDao(name: string): DataAccessObject<any> {
    switch (name) {
      default:
        return this.users;
    }
  }
}
