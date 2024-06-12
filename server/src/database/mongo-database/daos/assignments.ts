// Packages
import { Model } from 'mongoose';

// Local Imports
import { AssignmentModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Assignment as AssignmentInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Assignments.
 */
export class AssignmentDataAccessObject
  extends DataAccessObject<AssignmentInterface>
  implements DataAccessObjectInterface<AssignmentInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return AssignmentModel;
  }

  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'assignments';
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
