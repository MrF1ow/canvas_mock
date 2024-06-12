// Local Imports
import { AbstractDatabase } from '../database/abstract-database';
import { Environment } from '../helpers/environment';
import { getDatabase } from '../database';

import * as courses from '../data/courses.json';
import * as names from '../data/names.json';

// Types
import {
  DataAccessObjectInterface,
  QueryConditions,
} from '../types/database';
import {
  Assignment,
  Course,
  User,
} from '../types/tables';
import { Dictionary } from '../types';
import { hashPassword } from '../helpers/authorization';

const STUDENTS_PER_COURSE = 10;
const COURSES_PER_STUDENT = 4;
const ASSIGNMENTS_PER_COURSE = 10;

/**
 * Runs the stuff
 */
export const main = async () => {
  const database = getDatabase();

  await database.connect();

  if (database.isConnected()) {
    populateDatabase(database);
  }
};

/**
 * Populates the database with mock data.
 */
export const populateDatabase = async (database: AbstractDatabase): Promise<void> => {
  console.log('- Deleting old entries');

  await deleteAll(database);

  console.log('- Populating Database');

  const courses = await populateCourses(database);
  const users = await populateUsers(database);

  await populateEnrolled(
    database,
    courses,
    users,
  );

  await populateAssignments(
    database,
    courses,
  );
};

/**
 * Delete everything.
 */
export const deleteAll = async (database: AbstractDatabase): Promise<void> => {
  const promises = [];

  promises.push(database.assignments.delete({}));
  promises.push(database.courses.delete({}));
  promises.push(database.submissions.delete({}));
  promises.push(database.users.delete({}));
  promises.push(database.enrolled.delete({}));

  await Promise.all(promises);

  const total = await promises.reduce(async (
    prev: number,
    curr: Promise<number>,
  ) => {
    return prev + await curr;
  }, 0);

  console.log(` - All ${total} items deleted`);
};

/**
 * Populates database courses.
 */
export const populateCourses = async (database: AbstractDatabase): Promise<string[]> => {
  const courses = [];

  try {
    const count = await database.courses.count({});

    if (count >= Environment.getTargetCourses()) {
      return;
    }

    const add = Environment.getTargetCourses() - count;

    console.log(` - Adding ${add} courses`);

    const promises = [];

    for (let i = 0; i < add; i += 1) {
      promises.push(populateOneCourse(database));
    }

    console.log('   - Awaiting promises to resolve');

    await Promise.all(promises);

    for (let i = 0; i < promises.length; i += 1) {
      const id = await promises[i];

      if (id) {
        courses.push(id);
      }
    }

    console.log('   - All courses added');
  } catch (error) {
    console.log(error);
  }

  return courses;
};

/**
 * Populates database courses.
 */
export const populateOneCourse = async (database: AbstractDatabase): Promise<string | null> => {
  try {
    const instructor = await createInstructor();

    const _id = await database.users.insert(instructor);

    const course = createCourse(_id);

    await database.courses.insert(course);

    const result = await database.courses.findOne(course as unknown as QueryConditions);

    if (result) {
      return result._id;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Populates database users.
 */
export const populateUsers = async (database: AbstractDatabase): Promise<string[]> => {
  const users = [];

  try {
    const count = await database.courses.count({});

    if (count >= Environment.getTargetCourses() * STUDENTS_PER_COURSE) {
      return;
    }

    const add = Environment.getTargetCourses() * STUDENTS_PER_COURSE - count;

    console.log(` - Adding ${add} users`);

    const promises = [];

    for (let i = 0; i < add; i += 1) {
      promises.push(populateOneUser(database));
    }

    await Promise.all(promises);

    for (let i = 0; i < promises.length; i += 1) {
      const id = await promises[i];

      if (id) {
        users.push(id);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return users;
};

/**
 * Populates database courses.
 */
export const populateOneUser = async (database: AbstractDatabase): Promise<string | null> => {
  try {
    const user = await createUser();

    await database.users.insert(user);

    const result = await database.users.findOne(user as unknown as QueryConditions);

    if (result) {
      return result._id;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Populates database enrolled.
 */
export const populateEnrolled = async (
  database: AbstractDatabase,
  courses: string[] = [],
  users: string[] = [],
): Promise<Dictionary<string[]>> => {
  const enrolled = {} as Dictionary<string[]>;

  try {
    const promises = [];

    console.log(` - Enrolling ${users.length} students to ${COURSES_PER_STUDENT} courses each`);

    for (let i = 0; i < users.length; i += 1) {
      const student = users[i];

      for (let j = 0; j < COURSES_PER_STUDENT; j += 1) {
        let course = null;

        while (course == null || (course in enrolled && enrolled[course].includes(student))) {
          course = courses[Math.floor(Math.random() * courses.length)];
        }

        if (course in enrolled) {
          enrolled[course].push(student);
        } else {
          enrolled[course] = [ student ];
        }

        promises.push(database.enrolled.insert({
          studentId: student,
          courseId: course,
        }));
      }
    }

    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }

  return enrolled;
};

/**
 * Populates database assignments.
 */
export const populateAssignments = async (
  database: AbstractDatabase,
  courses: string[],
): Promise<Dictionary<string[]>> => {
  const assignments = {};
  
  try {
    const promises = [];

    console.log(` - Creating ${ASSIGNMENTS_PER_COURSE} for ${courses.length} courses each`);

    for (let i = 0; i < courses.length; i += 1) {
      const course = courses[i];

      for (let j = 0; j < ASSIGNMENTS_PER_COURSE; j += 1) {
        const assignment = {
          courseId: course,
          title: `Assignment ${j + 1}`,
          points: 100,
          due: new Date(),
        } as Assignment;

        promises.push(database.assignments.insert(assignment));
      }
    }

    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }

  return assignments;
};

/**
 * Populates database submissions.
 */
export const populateSubmissions = async (database: AbstractDatabase): Promise<string[]> => {
  const submissions = [];
  
  try {
    console.log(' - I\'m just not going to populate submissions. :)');
  } catch (error) {
    console.log(error);
  }

  return submissions;
};

/**
 * Whether a data access object should be populated.
 */
export const shouldPopulate = async (dao: DataAccessObjectInterface<any>): Promise<boolean> => {
  try {
    const count = await dao.count({});

    return (count == 0);
  } catch (error) {
    console.log(error);
  }
  return false;
};

/**
 * Creates a random course.
 */
export const createCourse = (instructorId: string = ''): Course => {
  const random = Math.random();

  return {
    subject: courses['subject-codes'][Math.floor(random * courses['subject-codes'].length)],
    number: `${Math.floor(random * 399) + 100}`,
    title: courses.titles[Math.floor(random * courses.titles.length)],
    term: `${courses.terms[Math.floor(random * courses.terms.length)]}${courses.years[Math.floor(random * courses.years.length)]}`,
    instructorId,
  };
};

/**
 * Generates a random user.
 */
export const createUser = async (): Promise<User> => {
  const random = Math.random();

  return {
    name: `${names.names[Math.floor(random * names.names.length)]} ${names.names[(Math.floor(random * names.names.length) + Math.floor(names.names.length / 2)) % names.names.length]}`,
    email: `${names.names[Math.floor(random * names.names.length)].toLowerCase()}${Math.floor(random * 999)}@gmail.com`,
    password: await hashPassword((random + 1).toString(36).substring(7)),
    role: 'student',
  };
};

/**
 * Generates a random instructor.
 */
export const createInstructor = async (): Promise<User> => {
  const user = await createUser();

  return {
    ...user,
    role: 'instructor',
  };
};

/**
 * Generates a random admin.
 */
export const createAdmin = async (): Promise<User> => {
  const user = await createUser();

  return {
    ...user,
    role: 'admin',
  };
};
