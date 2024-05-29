/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { AbstractDataAccessObject } from './abstract-dao';

// Types
import {
  Assignment,
  Course,
  Enrolled,
  Submission,
  User,
} from '../types/tables';
import { DataAccessObjectInterface } from '../types/database';
import UsedAbstractDatabaseError from '../errors/used-abstract-database-error';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class AbstractDatabase {
  /**
   * Data access object for Assignments.
   */
  assignments: DataAccessObjectInterface<Assignment> = new AbstractDataAccessObject<Assignment>();

  /**
   * Data access object for Courses.
   */
  courses: DataAccessObjectInterface<Course> = new AbstractDataAccessObject<Course>();

  /**
   * Data access object for Submissions.
   */
  submissions: DataAccessObjectInterface<Submission> = new AbstractDataAccessObject<Submission>();

  /**
   * Data access object for Users.
   */
  users: DataAccessObjectInterface<User> = new AbstractDataAccessObject<User>();

  /**
   * Data access object for Enrolleds.
   */
  enrolled: DataAccessObjectInterface<Enrolled> = new AbstractDataAccessObject<Enrolled>();

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
}
