/**
 * Types intended for using MongoDB, a NoSQL database.
 */

/**
 * Single database row.
 */
export interface DatabaseRow {
  /**
   * Database Unique Identifier.
   */
  _id?: string;
}

/**
 * Database column types.
 */
export type DatabaseColumnTypes = string
| number
| boolean
| unknown[]
| null
| undefined;

/**
 * Object defining a query filter.
 */
export interface QueryConditions {
  /**
   * Any key for column selection.
   */
  [key: string]: DatabaseColumnTypes | AdvancedQuery;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/and/
   */
  $and?: QueryConditions[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/nor/
   */
  $nor?: QueryConditions[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/or/
   */
  $or?: QueryConditions[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/expr/
   */
  $expr?: AdvancedQuery;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/
   */
  $jsonSchema?: JSONQuery;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/text/
   */
  $text?: TextQuery;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/where/
   *
   * @returns {boolean}
   */
  $where?: () => boolean;
}

/**
 * Advanced query for finding rows.
 */
export interface AdvancedQuery {
  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/eq/
   */
  $eq?: DatabaseColumnTypes;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/gt/
   */
  $gt?: DatabaseColumnTypes;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/gte/
   */
  $gte?: DatabaseColumnTypes;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/in/
   */
  $in?: DatabaseColumnTypes[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/lt/
   */
  $lt?: DatabaseColumnTypes;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/lte/
   */
  $lte?: DatabaseColumnTypes;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/ne/
   */
  $ne?: DatabaseColumnTypes;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/nin/
   */
  $nin?: DatabaseColumnTypes[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/not/
   */
  $not?: AdvancedQuery;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/exists/
   */
  $exists?: boolean;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/type/
   */
  $type?: string | string[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/mod/
   */
  $mod?: [number, number];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/regex/
   */
  $regex?: RegExp;

  /**
   * Supports $regex, see https://www.mongodb.com/docs/manual/reference/operator/query/regex/
   */
  $options?: string;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/all/
   */
  $all?: DatabaseColumnTypes[];

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
   */
  $elemMatch?: AdvancedQuery;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/query/size/
   */
  $size?: number;
}

/**
 * JSON query for finding rows. See https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/.
 */
export interface JSONQuery {
  /**
   * Object's property set must contain all the specified elements in the array.
   */
  required?: string[];

  /**
   * A valid JSON Schema where each value is also a valid JSON Schema object.
   */
  properties?: Dictionary<JSONQuery>;

  /**
   * Accepts same string aliases used for the $type operator.
   */
  bsonType?: string;

  /**
   * A string that describes the schema and has no effect on validation. Starting in MongoDB 5.1, if the description field is specified, MongoDB includes the description in the error output when a document fails validation.
   */
  description?: string;
}

/**
 * Text query for finding rows. See https://www.mongodb.com/docs/manual/reference/operator/query/text/
 */
export interface TextQuery {
  /**
   * 	A string of terms that MongoDB parses and uses to query the text index. MongoDB performs a logical OR search of the terms unless specified as a phrase.
   */
  $search: string;

  /**
   * Optional. The language that determines the list of stop words for the search and the rules for the stemmer and tokenizer. If not specified, the search uses the default language of the index.
   */
  $language?: string;

  /**
   * A boolean flag to enable or disable case sensitive search.
   */
  $caseSensitive?: boolean;

  /**
   * A boolean flag to enable or disable diacritic sensitive search against version 3 text indexes. Defaults to false; i.e. the search defers to the diacritic insensitivity of the text index.
   */
  $diacriticSensitive?: boolean;
}

/**
 * See https://www.mongodb.com/docs/manual/reference/operator/update/
 */
export interface AdvancedUpdate {
  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each
   */
  $each?: DatabaseColumnTypes[];
}

/**
 * Object defining a query update.
 */
export interface QueryUpdate {
  /**
   * Updates to specific columns by key.
   */
  [key: string]: DatabaseColumnTypes | AdvancedUpdate | QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/
   */
  $addToSet?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/pop/
   */
  $pop?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/pull/
   */
  $pull?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/push/
   */
  $push?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/sort/
   */
  $sort?: QueryConditions;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/inc/
   */
  $inc?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/min/
   */
  $min?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/max/
   */
  $max?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/mul/
   */
  $mul?: QueryUpdate;

  /**
   * See https://www.mongodb.com/docs/manual/reference/operator/update/setOnInsert/
   */
  $setOnInsert?: QueryUpdate;
}

/**
 * Object defining how to sort results.
 */
export interface QuerySort {
  /**
   * Column and ascending or descending.
   */
  [key: string]: number;
}

/**
 * Update defining a query projection.
 */
export interface QueryProjection {
  /**
   * What fields to keep or remove.
   */
  [key: string]: boolean;
}

/**
 * Placeholder in case MariaDB is prefered.
 */
interface MariaDBQuery {
  /**
   * Inject dynamic.
   */
  namedPlaceholders: boolean;

  /**
   * The query.
   */
  sql: string;
}

/**
 * Parameters for named placeholders.
 */
interface MariaDbParams {
  /**
   * Placeholder keys and values.
   */
  [key: string]: string | number | boolean | null;
}

/**
 * A query with parameters.
 */
export type MariaDbQuery = Array<IMariaDBQuery | IMariaDbParams>;

/**
 * SQL Column Types.
 */
export type SqlColumnTypes = `int(${number})`
| 'bigint'
| 'smallint'
| `varchar(${number})`
| `decimal(${number},${number})`
| 'text'
| 'boolean';

/**
 * Column values references to external tables.
 */
export interface ColumnReference {
  /**
   * Table linked.
   */
  table: string;
  
  /**
   * Key in the table it links to.
   */
  primaryKey: string;

  /**
   * Whether to delete this item if reference is destroyed.
   */
  deleteOnCascade: boolean;
}

/**
 * Advanced options for SQL columns.
 */
export interface ColumnOptions extends Dictionary<boolean | number | string | null | undefined | ColumnReference> {
  /**
   * Whether the column can be null.
   */
  notNull: boolean;

  /**
   * Whether an int is signed or unsigned.
   */
  unsigned: boolean;

  /**
   * Default value.
   */
  default: number | string | boolean | null | undefined;

  /**
   * Whether this field is a primary key.
   */
  primaryKey: boolean;

  /**
   * Table this references to.
   */
  foreignKey: ColumnReference | null;

  /**
   * Whether to auto increment the value.
   */
  autoIncrement: boolean;
}

/**
 * Basic data access object.
 */
export interface DataAccessObjectInterface<T> {
  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  clear: () => Promise<void>;

  /**
   * Not needed.
   */
  createTable: () => Promise<void>;

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  delete: (conditions: QueryConditions) => Promise<number>;

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  deleteById: (id: string) => Promise<boolean>;

  /**
   * Deletes all items from the Database.
   */
  deleteAll: () => Promise<void>;

  /**
   * Not needed.
   */
  dropTable: () => Promise<void>;

  /**
   * Counts the number of documents in a collection.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items.
   */
  count: (filter: QueryConditions = {}) => Promise<number>;

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  find: (
    conditions?: QueryConditions,
    projection?: QueryProjection,
    sort?: QuerySort,
    offset?: number,
    limit?: number,
  ) => Promise<T[]>;

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  findById: (id: string) => Promise<T | null>

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  findOne: (
    conditions: QueryConditions,
    projection?: QueryProjection,
  ) => Promise<T | null>;

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  insert: (item: T) => Promise<number>;

  /**
   * Pain.
   */
  query: (query: string | MariaDbQuery) => Promise<unknown>;

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter Which document.
   * @param {QueryUpdate} update Update to document.
   * @param {boolean} insertNew Whether to insert a new row.
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  update: (
    conditions: QueryConditions,
    update: QueryUpdate,
    insertNew?: boolean,
  ) => Promise<number>;

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  updateMany: (
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ) => Promise<number>;
}

/**
 * Database instance which holds DAOs.
 */
export interface DatabaseInterface {
  /**
   * Connects to database.
   */
  connect: () => Promise<void>;

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected: () => boolean;
}
