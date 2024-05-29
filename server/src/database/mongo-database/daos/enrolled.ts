// Packages
import { Model } from 'mongoose';

// Local Imports
import { EnrolledModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Enrolled as EnrolledInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Enrolleds.
 */
export class EnrolledDataAccessObject
  extends DataAccessObject<EnrolledInterface>
  implements DataAccessObjectInterface<EnrolledInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return EnrolledModel;
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
