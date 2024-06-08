// Local Imports
import { AbstractDatabase } from './abstract-database';
import { MongoDatabase } from './mongo-database';
import { CacheDatabase } from './cache-database';
import { DATABASE_TYPE } from '../config';
import { Environment } from '../helpers/environment';

/**
 * Static instance of the database.
 */
let DatabaseInstance: AbstractDatabase | null = null;

/**
 * Generates database based on environmental variables.
 */
const initializeDatabase = (): void => {
  if (!DatabaseInstance) {
    if (Environment.getDatabaseType() === DATABASE_TYPE.MONGO
      || Environment.getDatabaseType() === DATABASE_TYPE.MONGO_LOCAL) {
      DatabaseInstance = new MongoDatabase();
    } else {
      DatabaseInstance = new CacheDatabase();
    }
  }
};

/**
 * Retrieves database based on environmental variables.
 *
 * @returns {Database} The database.
 */
export const getDatabase = (): AbstractDatabase => {
  initializeDatabase();

  return DatabaseInstance as AbstractDatabase;
};
