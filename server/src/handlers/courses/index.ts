// Local Imports
import { CreateCourseStudentsHandler } from './create-course-students-handler';
import { GetCourseAssignmentsHandler } from './get-course-assignments-handler';
import { GetCourseStudentsHandler } from './get-course-students';
import { GetCourseRosterHandler } from './get-course-roster-handler';
import { DeleteCourseHandler } from './delete-course-handler';
import { CreateCourseHandler } from './create-course-handler';
import { GetCoursesHandler } from './get-courses-handler';
import { EditCourseHandler } from './edit-course-handler';
import { GetCourseHandler } from './get-course-handler';
import { Router } from '../router';

/**
 * Course routes.
 */
export class CourseRoutes extends Router {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/courses');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new CreateCourseHandler());
    this._routes.push(new CreateCourseStudentsHandler());
    this._routes.push(new DeleteCourseHandler());
    this._routes.push(new EditCourseHandler());
    this._routes.push(new GetCourseAssignmentsHandler());
    this._routes.push(new GetCourseHandler());
    this._routes.push(new GetCourseRosterHandler());
    this._routes.push(new GetCourseStudentsHandler());
    this._routes.push(new GetCoursesHandler());
  }
}
