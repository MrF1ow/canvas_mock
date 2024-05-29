// Local Imports
import { DataAccessObject } from './dao';

// Types
import { User as UserInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for User.
 */
export class UserDataAccessObject
  extends DataAccessObject<UserInterface>
  implements DataAccessObjectInterface<UserInterface> {
  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {};
  }
}