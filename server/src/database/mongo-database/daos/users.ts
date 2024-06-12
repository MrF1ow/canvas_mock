// Packages
import { OptionalId } from 'mongodb';
import { Model } from 'mongoose';

// Local Imports
import { UserModel } from '../models';
import { hashPassword } from '../../../helpers/authorization';
import { DataAccessObject } from './dao';

// Types
import {DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';
import { User as UserInterface } from '../../../types/tables';

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
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'users';
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
