// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  studentId: {
    type: String,
    required: true,
  },

  courseId: {
    type: String,
    required: true,
  },
});

export const EnrolledModel = model('Enrolled', schema);
