// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Course as CourseInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Course.
 */
export class CourseDataAccessObject
  extends DataAccessObject<CourseInterface>
  implements DataAccessObjectInterface<CourseInterface> {
  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {};
  }
}