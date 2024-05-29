// Packages
import { Model } from 'mongoose';

// Local Imports
import { UserModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { User as UserInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Users.
 */
export class UserDataAccessObject
  extends DataAccessObject<UserInterface>
  implements DataAccessObjectInterface<UserInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return UserModel;
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
