// packages

import { Model, Document } from 'mongoose';

/**
 * Paginates the results of a query on the given model.
 *
 * @param {Model<T & Document>} model - The Mongoose model to query.
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of documents per page.
 * @param {Object} query - The query object to filter the documents.
 * @returns {Promise<Array<T>>} The paginated documents.
 */
export async function paginate<T>(
  model: Model<T & Document>,
  page: number,
  limit: number,
  query: Object,
): Promise<Array<T>> {
  const skip = (page - 1) * limit;
  const results = await model.find(query).skip(skip).limit(limit).exec();
  return results;
}
