// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  courseId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    default: 'Unknown',
  },

  points: {
    type: Number,
    default: 0,
  },

  due: {
    type: Date,
    default: new Date(),
  },
});

export const AssignmentModel = model('Assignment', schema);
