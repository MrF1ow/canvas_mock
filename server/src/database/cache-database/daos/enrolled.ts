// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Enrolled as EnrolledInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Enrolled.
 */
export class EnrolledDataAccessObject
  extends DataAccessObject<EnrolledInterface>
  implements DataAccessObjectInterface<EnrolledInterface> {
  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {};
  }
}