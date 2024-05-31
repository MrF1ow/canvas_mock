// Local Imports
import {
  AUTHORIZATION_TYPE,
  PAGE_SIZE,
  REQUEST_TYPE,
} from '../../config';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import { DatabaseColumnTypes } from '../../types/database';

/**
 * Returns the list of all Courses.  This list should be paginated.  The Courses returned should not contain the list of students in the Course or the list of Assignments for the Course.
 */
export class GetCoursesHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/',
    );
  }

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
  ): Promise<void> {
    try {
      // Parse query.
      const {
        page = '1',
        subject = '',
        number = '',
        term = '',
      } = req.query || {};

      // Create filter based on present parameters.
      const filter = {} as Dictionary<DatabaseColumnTypes>;
      if (subject !== '') {
        // Casting paramters because they're of type (string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[])
        filter.subject = `${subject}`;
      }
      if (number !== '') {
        // Disregarding NaN check in case numbers include letter subdivisions.
        // && !isNaN(parseInt(`${number}`))
        filter.number = `${number}`;
      }
      if (term !== '') {
        filter.term = `${term}`;
      }

      // Calculate offset if present and valid.
      let offset = 0;
      if (page !== '1' && !isNaN(parseInt(`${page}`, 10))) {
        offset = (parseInt(`${page}`, 10) - 1) * PAGE_SIZE;
      }

      // Get all courses.
      const courses = await Handler._database.courses.find(
        filter,
        {},
        {},
        offset,
        PAGE_SIZE,
      );

      // Get a count of total documents.
      const count = await Handler._database.courses.count();

      // Implement me.
      const links = {};

      res.status(200).send({
        pageNumber: (offset / PAGE_SIZE) + 1,
        totalPages: Math.ceil(count / PAGE_SIZE),
        pageSize: PAGE_SIZE,
        totalCount: count,
        courses,
        links,
      });
    } catch (error) {
      Monitor.log(
        GetCoursesHandler,
        error,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
