// Packages
import { Model } from 'mongoose';

// Local Imports
import { SubmissionModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Submission as SubmissionInterface } from '../../../types';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Submissions.
 */
export class SubmissionDataAccessObject
  extends DataAccessObject<SubmissionInterface>
  implements DataAccessObjectInterface<SubmissionInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return SubmissionModel;
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
