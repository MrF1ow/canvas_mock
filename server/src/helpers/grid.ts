require("dotenv").config();

// Packages
import multer from "multer";
import crypto from "node:crypto";
import { Connection, mongo } from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";

// Local Imports
const url = process.env.DATABASE_URL;

/**
 * Set up GridFs for the specified database.
 *
 * @param {Connection} connection Database connection.
 */
export async function setupGridFs(connection: Connection): Promise<void> {
  if (connection.readyState !== 1) {
    throw new Error("Database connection is not open.");
  }
  const gfs = Grid(connection.db, mongo);
  gfs.collection("uploads");
}

/*
 * Create a new GridFsStorage object with the specified configuration.
 * This object will be used to store files in the database.
 */
export const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const filename = hash.update(file.originalname).digest('hex');
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

/**
 * Create a new multer object with the specified storage configuration.
 */
export const upload = multer({ storage });
