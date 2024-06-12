/* eslint-disable @typescript-eslint/no-unused-vars */
// Local Imports
import UsedAbstractDAOError from '../errors/used-abstract-dao-error';

// Types
import {
  MariaDbQuery,
  QueryConditions,
  QueryProjection,
  QuerySort,
  QueryUpdate,
} from '../types/database';

/**
 * Abstract Data Access Object
 */
export class AbstractDataAccessObject<T> {
  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  clear(): Promise<void> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Not needed.
   */
  createTable(): Promise<void> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Counts the number of documents in from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of documents.
   */
  count(conditions: QueryConditions = {}): Promise<number> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  delete(conditions: QueryConditions): Promise<number> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Deletes all items from the Database.
   */
  deleteAll(): Promise<void> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  deleteById(id: string): Promise<boolean> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Not needed.
   */
  dropTable(): Promise<void> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  find(
    conditions: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = 20,
  ): Promise<T[]> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  findById(id: string): Promise<T | null> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  findOne(
    conditions: QueryConditions,
    projection: QueryProjection = {},
  ): Promise<T | null> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  insert(item: T): Promise<string> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Pain.
   */
  query(query: string | MariaDbQuery): Promise<unknown> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  update(
    conditions: QueryConditions,
    update: QueryUpdate,
  ): Promise<number> {
    throw new UsedAbstractDAOError();
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    throw new UsedAbstractDAOError();
  }
}
