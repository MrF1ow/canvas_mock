// Local Imports
import { Database as DatabaseClass } from './database';
import { MongoDatabase } from './mongo-database';
import { CacheDatabase } from './cache-database';
import { DATABASE_TYPE } from '../config';
import { Environment } from '../helpers/environment';

/**
 * Static instance of the database.
 */
let DatabaseInstace: DatabaseClass | null = null;

/**
 * Generates database based on environmental variables.
 */
const initializeDatabase = (): void => {
  if (!DatabaseInstace) {
    if (Environment.getDatabaseType() === DATABASE_TYPE.MONGO
      || Environment.getDatabaseType() === DATABASE_TYPE.MONGO_LOCAL) {
      DatabaseInstace = new MongoDatabase();
    } else {
      DatabaseInstace = new CacheDatabase();
    }
  }
};

/**
 * Retrieves database based on environmental variables.
 *
 * @returns {Database} The database.
 */
export const getDatabase = (): DatabaseClass => {
  initializeDatabase();

  return DatabaseInstace as DatabaseClass;
};
