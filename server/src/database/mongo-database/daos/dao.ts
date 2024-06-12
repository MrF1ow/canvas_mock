// Packages
import {
  Collection,
  Db,
  Filter,
  FindOptions,
  ObjectId,
  OptionalId,
  UpdateFilter
} from 'mongodb';
import {
  Model,
  QueryOptions,
} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
   * Reference to MongoDb collection.
   */
  _collection: Collection<Document> | null;

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
   * Sets collection.
   */
  setDb(db: Db) {
    this._collection = db.collection(this._getCollectionName());
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
    // await this._model.deleteMany({});
    if (!this._collection) {
      return;
    }
    await this._collection.deleteMany({});
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {Promise<string>} ID of item created.
   */
  async insert(item: T): Promise<string> {
    // const row = new this._model(item);

    // await row.save();

    // return 1;
    if (!this._collection) {
      return '';
    }

    const withId = {
      ...item,
      id: uuidv4(),
    } as T;

    const response = await this._collection.insertOne(withId as OptionalId<Document>);

    return `${response.insertedId}`;
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
    // return this._model.findOne(
    //   filter,
    //   projection,
    // );
    if (!this._collection) {
      return null;
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    return this._collection.findOne(
      filter,
      {
        projection,
      }
    ) as Promise<T | null>;
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
    if (!this._collection) {
      return [];
    }

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

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    // return this._model.find(
    //   filter,
    //   projection,
    //   options,
    // );

    return (await (await this._collection.find(
      filter,
      options as unknown as FindOptions<Document>,
    )).toArray()) as T[];
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    if (!this._collection) {
      return null;
    }

    return this.findOne({ id });
  }

  /**
   * Counts the number of documents in a collection.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items.
   */
  async count(filter: QueryConditions = {}): Promise<number> {
    // const results = this._model.countDocuments(filter);
    // return results;
    if (!this._collection) {
      return -1;
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    return this._collection.countDocuments(filter);
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryConditions = {}): Promise<number> {
    // const {
    //   deletedCount,
    // } = await this._model.deleteMany(filter);

    // return deletedCount;
    if (!this._collection) {
      return -0;
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    const response = await this._collection.deleteMany(filter);

    return response.deletedCount;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    // const {
    //   deletedCount,
    // } = await this._model.deleteOne({ _id: id });

    // return deletedCount === 1;
    if (!this._collection) {
      return false;
    }

    const response = await this._collection.deleteOne({ id });

    return response.deletedCount > 0;
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
    // const { modifiedCount } = await this._model.updateOne(
    //   conditions,
    //   update,
    //   {
    //     upsert: true,
    //   },
    // );

    // return modifiedCount;
    if (!this._collection) {
      return 0;
    }

    const alteredUpdate = {
      $set: {},
    } as UpdateFilter<Document>;

    for (let key in update) {
      alteredUpdate.$set[key] = update[key];
    }

    // const cleanedFilter = { ...conditions };
    // if ('_id' in conditions && !(conditions._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${conditions._id}`);
    // }

    const response = await this._collection.updateOne(
      conditions as Filter<Document>,
      alteredUpdate,
    );

    return response.modifiedCount;
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
    // const { modifiedCount } = await this._model.updateMany(
    //   filter,
    //   update,
    //   {
    //     upsert: insertNew,
    //   },
    // );

    // return modifiedCount;
    if (!this._collection) {
      return 0;
    }

    const alteredUpdate = {
      $set: {},
    } as UpdateFilter<Document>;

    for (let key in update) {
      alteredUpdate.$set[key] = update[key];
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    const response = await this._collection.updateMany(
      filter as Filter<Document>,
      alteredUpdate,
      {
        upsert: insertNew,
      },
    );

    return response.modifiedCount;
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
    await this.deleteAll();
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   *
   * @returns {Model} The mongoose model.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    throw new Error('Used abstract DAO!');
  }

  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    throw new Error('Used abstract DAO!');
  }
}
