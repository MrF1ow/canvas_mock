// Local Imports
import { AbstractDataAccessObject } from '../database/abstract-dao';
import { PAGE_SIZE } from '../config';

// Types
import { QueryConditions } from '../types/database';

/**
 * Paginates the results of a query on the given model.
 *
 * @param {Model<T & Document>} model - The Mongoose model to query.
 * @param {number} page - The page number to retrieve.
 * @param {Object} query - The query object to filter the documents.
 * @returns {Promise<Array<T>>} The paginated documents.
 */
export async function paginate<T>(
  model: AbstractDataAccessObject<T>,
  page: number,
  query: QueryConditions,
): Promise<any> {
  const items = await model.find(
    query,
    {},
    {},
    (page - 1) * PAGE_SIZE,
    PAGE_SIZE,
  );

  console.log(items);

  const count = await model.count(query);

  return {
    pageNumber: page,
    totalPages: Math.ceil(count / PAGE_SIZE),
    pageSize: PAGE_SIZE,
    totalCount: count,
    items,
  };
}
