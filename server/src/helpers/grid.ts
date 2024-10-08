// Packages
import {
  MongoClient,
  GridFSBucket,
} from 'mongodb';
import { Readable } from 'stream';
import multer from 'multer';
import crypto from 'node:crypto';

// Local Imports
import { Environment } from './environment';

export const fileTypes = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
};

/**
 * Encrypt the name of the file.
 *
 * @param name Name of the file.
 * @returns Encrypted name of the file.
 */
export const encryptName = (name: string): string => {
  const hash = crypto.createHash('sha256');
  return hash.update(name).digest('hex');
};

/**
 * Create a new multer object with the specified storage configuration.
 * This object will be used to upload files to the database.
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (
    req,
    file,
    cb,
  ) => {
    cb(
      null,
      !!fileTypes[file.mimetype],
    );
  },
});

/**
 * Upload a submission to the database.
 *
 * @param {MongoClient} client Database connection.
 * @param {Express.Multer.File} file File to upload.
 * @returns {Promise<void>}
 */
export const uploadSubmission = (client: MongoClient, file: Express.Multer.File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = client.db(Environment.getDatabaseName());
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // create a readable stream from the file buffer
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null); // signal the end of the stream

    // create an upload stream to GridFS
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
      metadata: { uploadedAt: new Date() },
    });

    // pipe the file buffer to the GridFS upload stream
    readableStream.pipe(uploadStream)
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', () => {
        resolve();
      });
  });
};

