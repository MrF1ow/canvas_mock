// Packages
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { AbstractDataAccessObject } from '../../abstract-dao';

// Types
import {
  DataAccessObjectInterface,
  DatabaseColumnTypes,
  MariaDbQuery,
  QueryConditions,
  QueryProjection,
  QuerySort,
  QueryUpdate,
} from '../../../types/database';
import { Dictionary } from '../../../types';

/**
 * Abstract class for cache Data Access Objects.
 */
export class DataAccessObject<T> extends AbstractDataAccessObject<T> implements DataAccessObjectInterface<T> {
  /**
   * Cache storage for the DataAccessObject.
   *
   * @access protected
   */
  protected _items: T[];

  /**
   * Instantiates a new DataAccessObject.
   */
  constructor() {
    super();
  
    this._items = [];
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
    this._items = [];
  }

  /**
   * Creates a new table.
   * 
   * @returns {Promise<void>} Promise of the action.
   */
  async createTable(): Promise<void> {
    return;
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} [filter = {}] The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryConditions = {}): Promise<number> {
    const deleteItems = this._findFilterItems(filter);
    const deleteIds = deleteItems.map((item) => {
      if ('id' in (item as unknown as Dictionary<any>)) {
        return (item as unknown as Dictionary<string>).id;
      }
      return 'unknown id';
    });

    this._items = this._items.filter((item) => {
      if ('id' in (item as unknown as Dictionary<any>)) {
        return !(deleteIds.includes((item as unknown as Dictionary<string>).id));
      }
      return true;
    });

    return deleteItems.length;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    return (await this.delete({ id })) > 0;
  }

  /**
   * Deletes all items from the Database.
   * 
   * @returns {Promise<void>} Promise of the action.
   */
  async deleteAll(): Promise<void> {
    this._items = [];
  }

  /**
   * Drops the entire table.
   * 
   * @returns {Promise<void>} Promise of the action.
   */
  async dropTable(): Promise<void> {
    this._items = [];
  }

  /**
   * Counts the number of documents in a collection.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items.
   */
  async count(filter: QueryConditions = {}): Promise<number> {
    return this._items.length;
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} [filter = {}] The filter to apply to the query.
   * @param {QueryProjection} [projection = {}] The projection to apply to the query.
   * @param {QuerySort | null} [sort = null] The sort to apply to the query.
   * @param {number} [offset = 0] Offset to begin in list.
   * @param {number} [limit = -1] Number of items to return.
   * @returns {Promise<T[]>} The items.
   */
  async find(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset = 0,
    limit = -1,
  ): Promise<T[]> {
    const items = this._findFilterItems(
      filter,
      sort ? sort : this._getSort(),
      offset,
      limit,
    );
    const projectedItems = this._applyProjection(
      items,
      projection,
    ) as unknown as T[];

    return projectedItems;
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    const items = this._findFilterItems({
      id,
    });

    if (items.length === 0) {
      return null;
    }
    return items[0];
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} [filter = {}] The filter to apply to the query.
   * @param {QueryProjection} [projection = {}] The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  async findOne(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
  ): Promise<T | null> {
    const items = this._findFilterItems(filter);
    const projectedItems = this._applyProjection(
      items,
      projection,
    ) as unknown as T[];

    return projectedItems[0] || null;
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} item The item to create.
   * @returns {T} The created item.
   */
  async insert(item: T): Promise<number> {
    await this._create(item);

    return 1;
  }

  /**
   * Pain.
   * 
   * @param {string | MariaDbQuery} query SQL query.
   * @returns {Promise<any>} Response to query.
   */
  async query(query: string | MariaDbQuery): Promise<any> {
    return null;
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async _create(options: T): Promise<T> {
    const entry = {
      _id: uuidv4(),
      ...options,
    };

    this._items.push(entry);

    return entry;
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Dictionary<number>} Sort method.
   */
  _getSort() {
    return {};
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  async update(
    conditions: QueryConditions = {},
    update: QueryUpdate = {},
  ): Promise<number> {
    return this.updateMany(
      conditions,
      update,
      false,
    );
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} [filter = {}] The filter to apply to the query.
   * @param {QueryUpdate} [update = {}] The update to apply.
   * @param {boolean} [insertNew = true] Whether to insert a new row if one doesn't exist.
   * @returns {Promise<number>} The number of documents updated.
   */
  async updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    const items = this._findFilterItems(filter);
    const itemIds = items.map((item) => {
      if ('id' in (item as unknown as Dictionary<any>)) {
        return (item as unknown as Dictionary<string>).id;
      }
      return 'unknown id';
    });

    if (itemIds.length === 0 && insertNew) {
      try {
        // Risky, but don't have many other options from the Abstract class.
        await this._create(update as unknown as T);

        return 1;
      } catch (error) {
        return 0;
      }
    }

    let updatedCount = 0;

    for (let i = 0; i < this._items.length; i += 1) {
      const itemId = (this._items[i] as unknown as Dictionary<string>).id;

      if (itemIds.includes(itemId)) {
        this._updateItem(
          i,
          update,
        );

        updatedCount += 1;
      }
    }

    return updatedCount;
  }

  /**
   * Applies filter to items.
   *
   * @access protected
   * @param {QueryConditions} [filter = {}] Filter to be applied.
   * @param {QuerySort | null} [sort = null] Sort to apply.
   * @param {number} [offset = 0] Number of items to skip.
   * @param {number} [limit = 20] Number of items to return.
   * @returns {T[]} The filtered items.
   */
  protected _findFilterItems(
    filter: QueryConditions = {},
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = 20,
  ): T[] {
    const approved = [] as boolean[];
    const keys = Object.keys(filter);

    if (keys.length === 0) {
      return this._items;
    }
    if (offset === this._items.length) {
      return [];
    }

    for (let i = offset; i < this._items.length; i += 1) {
      const item = this._items[i] as unknown as Dictionary<DatabaseColumnTypes>;

      if (approved.length === i) {
        approved.push(true);
      }

      for (let j = 0; j < keys.length; j += 1) {
        const value = item[keys[j]];
        const filterValue = filter[keys[j]];

        if (typeof (filterValue) === 'object') {
          const filterValueKeys = Object.keys(filterValue as unknown as Dictionary<any>);

          for (let k = 0; k < filterValueKeys.length; k += 1) {
            if (filterValueKeys[k] === '$in') {
              type FilterValueArray = Dictionary<DatabaseColumnTypes[]>;
              const array = (filterValue as unknown as FilterValueArray)[filterValueKeys[k]];

              if (!(array.includes(value))) {
                approved[i] = false;
                break;
              }
            }
          }

          if (approved[i] === false) {
            break;
          }
        } else if (filterValue as any instanceof Array
          && (value as any) instanceof Array) {
          const requiredArray = (filterValue as unknown as DatabaseColumnTypes[]);

          if (requiredArray.length !== (value as any[]).length) {
            approved[i] = false;
            break;
          }

          for (let k = 0; k < requiredArray.length; k += 1) {
            const requiredValue = requiredArray[k];

            if (!((value as unknown as DatabaseColumnTypes[]).includes(requiredValue))) {
              approved[i] = false;
              break;
            }
          }

          if (approved[i] === false) {
            break;
          }
        } else if (value !== filterValue) {
          approved[i] = false;
          break;
        }
      }
    }

    const filteredItems = [] as T[];

    for (let i = 0; i < approved.length && filteredItems.length < limit; i += 1) {
      if (approved[i]) {
        filteredItems.push(this._items[i]);
      }
    }

    return filteredItems;
  }

  /**
   * Updates an item at a given index.
   *
   * @access protected
   * @param {number} index Index of the item to be updated.
   * @param {QueryUpdate} [update = {}] The update to be applied.
   */
  protected _updateItem(
    index: number,
    update: QueryUpdate = {},
  ): void {
    const oldItem = this._items[index];
    const newItem = {} as Dictionary<DatabaseColumnTypes>;
    const fields = Object.keys(oldItem as Dictionary<any>);

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i] in update) {
        newItem[fields[i]] = (update as unknown as Dictionary<DatabaseColumnTypes>)[fields[i]];
      } else {
        newItem[fields[i]] = (oldItem as unknown as Dictionary<DatabaseColumnTypes>)[fields[i]];
      }
    }

    this._items[index] = newItem as unknown as T;
  }

  /**
   * Applies a projection to a set of items.
   *
   * @access protected
   * @param {Dictionary<DatabaseColumnTypes>[]} [items = []] Items to apply projection to.
   * @param {QueryProjection} [projection = {}] Projection to be applied.
   * @returns {Dictionary<DatabaseColumnTypes>[]} Items with applied projection.
   */
  protected _applyProjection(
    items: T[] = [],
    projection: QueryProjection = {},
  ): Dictionary<DatabaseColumnTypes>[] {
    const projectedItems = [] as Dictionary<DatabaseColumnTypes>[];
    const fields = Object.keys(projection);
  
    if (fields.length === 0) {
      return items as unknown as Dictionary<DatabaseColumnTypes>[];
    }
  
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i] as unknown as Dictionary<DatabaseColumnTypes>;
      const projectedItem = {} as Dictionary<DatabaseColumnTypes>;
  
      for (let j = 0; j < fields.length; j += 1) {
        const field = fields[j];
  
        projectedItem[fields[j]] = item[field] as DatabaseColumnTypes;
      }
  
      projectedItems.push(projectedItem);
    }
  
    return projectedItems;
  }
}