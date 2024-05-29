// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Submission as SubmissionInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Submission.
 */
export class SubmissionDataAccessObject
  extends DataAccessObject<SubmissionInterface>
  implements DataAccessObjectInterface<SubmissionInterface> {
  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {};
  }
}