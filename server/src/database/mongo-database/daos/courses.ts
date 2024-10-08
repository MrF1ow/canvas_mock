// Packages
import { Model } from 'mongoose';

// Local Imports
import { CourseModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Course as CourseInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Courses.
 */
export class CourseDataAccessObject
  extends DataAccessObject<CourseInterface>
  implements DataAccessObjectInterface<CourseInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return CourseModel;
  }

  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'courses';
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      hours: -1,
    };
  }
}
