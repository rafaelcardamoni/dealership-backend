import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import crypto from 'crypto';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: (request: Request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'public', 'images'));
    },
    filename: (request: Request, file, callback) => {
      const hash = crypto.randomBytes(16).toString('hex');

      file.filename = `${hash}-${file.originalname}`;

      callback(null, file.filename);
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'dealership-project-upload-1',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, callback) => {
      const hash = crypto.randomBytes(16).toString('hex');

      const fileName = `${file.originalname}-${hash}`;

      callback(null, fileName);
    }
  })
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'public', 'images'),
  storage: storageTypes['s3'],
  limits: {
    fileSize: 5 * (1024 * 1024)
  },
  fileFilter: (request: Request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/webp'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'));
    }
  }
};
