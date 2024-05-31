/**
 * An object representing information about a single assignment.
 */
export interface Assignment {
  /**
   * Assignment's unique identifier.
   */
  _id?: string;

  /**
   * ID of the Course associated with the Assignment.  Exact type/format will depend on your implementation but will likely be either an integer or a string.
   */
  courseId: string;

  /**
   * Assignment description.
   */
  title: string;

  /**
   * Possible points for the Assignment.
   */
  points: number;

  /**
   * Date and time Assignment is due.  Should be in ISO 8601 format.
   */
  due: Date;
}

/**
 * An object representing information about a specific course.
 */
export interface Course {
  /**
   * Course's unique identifier.
   */
  _id?: string;

  /**
   * Short subject code.
   */
  subject: string;

  /**
   * Course number.
   */
  number: string;

  /**
   * Course title.
   */
  title: string;

  /**
   * Academic term in which Course is offered.
   */
  term: string;

  /**
   * ID for Course instructor.  Exact type/format will depend on your implementation but will likely be either an integer or a string.  This ID must correspond to a User with the 'instructor' role.
   */
  instructorId: string;
}

/**
 * An object representing information about a single student submission for an Assignment.
 */
export interface Submission {
  /**
   * Submission's unique identifier.
   */
  _id?: string;

  /**
   * ID of the Assignment to which the Submission corresponds.  Exact type/format will depend on your implementation but will likely be either an integer or a string.
   */
  assignmentId: string;

  /**
   * ID of the Student who created the submission.  Exact type/format will depend on your implementation but will likely be either an integer or a string.
   */
  studentId: string;

  /**
   * Date and time Submission was made.  Should be in ISO 8601 format.
   */
  timestamp: Date;

  /**
   * The grade, in points, assigned to the student for this sumbission, if one is assigned.  Should not be accepted during submission creation, only via update.
   */
  grade: number;

  /**
   * When the Submission is being created, this will be the binary data contained in the submitted file.  When Submission information is being returned from the API, this will contain the URL from which the file can be downloaded.
   */
  file: string;
}

/**
 * Linking table between students and courses.
 */
export interface Enrolled {
  /**
   * The student enrolled.
   */
  studentId: string;

  /**
   * The course they're enrolled in.
   */
  courseId: string;
}

/**
 * Permission role of the User.  Can be either 'admin', 'instructor', or 'student'.
 */
export type UserRole = 'student'
| 'admin'
| 'instructor';

/**
 * An object representing information about a Tarpaulin application user.
 */
export interface User extends PublicUser {
  /**
   * The User's plain-text password.  This is required when creating a new User and when logging in.
   */
  password: string;
}

/**
 * Public data about a user.
 */
export interface PublicUser {
  /**
   * User's unique identifier.
   */
  _id?: string;

  /**
   * Full name of the User.
   */
  name: string;

  /**
   * Email address for the User.  This is required to be unique among all Users.
   */
  email: string;

  /**
   * Permission role of the User.  Can be either 'admin', 'instructor', or 'student'.
   */
  role: UserRole;
}
