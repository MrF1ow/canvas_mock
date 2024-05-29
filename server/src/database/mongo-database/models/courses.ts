// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  subject: {
    type: String,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  term: {
    type: String,
    required: true,
  },

  instructorId: {
    type: String,
    required: true,
  },
});

export const CourseModel = model('Course', schema);
