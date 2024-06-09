// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_UNAUTHORIZED_ERROR,
} from "../../config/messages";
import { AUTHORIZATION_TYPE, REQUEST_TYPE, USER_ROLE } from "../../config";
import { Monitor } from "../../helpers/monitor";
import { Handler } from "../handler";

// Types
import { ServerRequest, ServerResponse } from "../../types";

/**
 * Returns the list of all Submissions for an Assignment.  This list should be paginated.  Only an authenticated User with 'admin' role or an authenticated 'instructor' User whose ID matches the `instructorId` of the Course corresponding to the Assignment's `courseId` can fetch the Submissions for an Assignment.
 */
export class GetAssignmentSubmissionsHandler extends Handler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      "/:id/submissions",
      AUTHORIZATION_TYPE.INSTRUCTOR || AUTHORIZATION_TYPE.ADMIN
    );
  }

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(req: ServerRequest, res: ServerResponse): Promise<void> {
    try {

      // Parse path parameters.
      const { id } = req.params || {};

      if (!id) {
        res.status(404).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING("assignment", "ID"),
        });
        return;
      }

      const assignment = await Handler._database.assignments.findById(id);

      const user = await Handler._database.users.findById(req.user);

      // If user is an instructor, check if the course is taught by the instructor
      if (user.role === USER_ROLE.INSTRUCTOR) {
        const course = await Handler._database.courses.findById(
          assignment.courseId
        );

        // If the instructor is not the instructor of the course they are trying to create an assignment for
        if (course.instructorId !== req.user) {
          // Send an unauthorized error
          res.status(403).send({
            error: MESSAGE_UNAUTHORIZED_ERROR,
          });

          return;
        }
      }

      if (!assignment) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND("assignment", "ID", id),
        });
        return;
      }

      // ADD CODE FOR PAGINATION

      const submissions = await Handler._database.submissions.find({
        assignmentId: id,
      });

      res.status(200).send({
        submissions,
      });
    } catch (error) {
      Monitor.log(
        GetAssignmentSubmissionsHandler,
        error,
        Monitor.Layer.WARNING
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
