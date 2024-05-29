// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Assignment as AssignmentInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Assignment.
 */
export class AssignmentDataAccessObject
  extends DataAccessObject<AssignmentInterface>
  implements DataAccessObjectInterface<AssignmentInterface> {
  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {};
  }
}