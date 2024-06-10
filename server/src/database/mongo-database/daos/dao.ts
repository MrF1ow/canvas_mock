// Packages
import {
  Model,
  QueryOptions,
} from 'mongoose';

// Types
import {
  QueryConditions,
  QueryProjection,
  QueryUpdate,
  DataAccessObjectInterface,
  MariaDbQuery,
  QuerySort,
} from '../../../types/database';

/**
 * Abstract class for Data Access Objects.
 */
export class DataAccessObject<T> implements DataAccessObjectInterface<T> {
  /**
   * Mongoose Model for DataAccessObject.
   */
  _model: Model<unknown, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>;

  /**
   * Instantiates a new DataAccessObject.
   */
  constructor() {
    this._model = this._getModel();
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getSort() {
    return {};
  }

  /**
   * Pain.
   */
  async query(query: string | MariaDbQuery): Promise<unknown> {
    return null;
  }

  /**
   * Not needed.
   */
  async createTable(): Promise<void> {
    return;
  }

  /**
   * Not needed.
   */
  async dropTable(): Promise<void> {
    return;
  }

  /**
   * Deletes all items from the Database.
   */
  async deleteAll(): Promise<void> {
    await this._model.deleteMany({});
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async insert(item: T): Promise<number> {
    const row = new this._model(item);

    await row.save();

    return 1;
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  async findOne(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
  ): Promise<T | null> {
    return this._model.findOne(
      filter,
      projection,
    );
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @param {QuerySort | null} sort The sort to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  async find(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = -1,
  ): Promise<T[]> {
    const options = {} as QueryOptions<T>;

    if (limit > 0) {
      options.limit = limit;
    }
    if (offset > 0) {
      options.skip = offset;
    }
    if (sort) {
      options.sort = sort;
    } else {
      options.sort = this._getSort();
    }

    return this._model.find(
      filter,
      projection,
      options,
    );
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    return this._model.findById(id);
  }

  /**
   * Counts the number of documents in a collection.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items.
   */
  async count(filter: QueryConditions = {}): Promise<number> {
    const results = this._model.countDocuments(filter);
    console.log(results);
    return results;
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryConditions = {}): Promise<number> {
    const {
      deletedCount,
    } = await this._model.deleteMany(filter);

    return deletedCount;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    const {
      deletedCount,
    } = await this._model.deleteOne({ _id: id });

    return deletedCount === 1;
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
    const { modifiedCount } = await this._model.updateOne(
      conditions,
      update,
      {
        upsert: true,
      },
    );

    return modifiedCount;
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  async updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    const { modifiedCount } = await this._model.updateMany(
      filter,
      update,
      {
        upsert: insertNew,
      },
    );

    return modifiedCount;
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
    await this._model.deleteMany();
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   *
   * @returns {Model} The mongoose model.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    throw new Error('Used abstract DAO!');
  }
}
