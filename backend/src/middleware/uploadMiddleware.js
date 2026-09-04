const multer = require('multer');
const ApiError = require('../utils/apiError');
const { env } = require('../config/env');

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

/**
 * Multer memory storage with file type validation.
 * Files are held in memory buffers and then uploaded to Supabase Storage.
 */
const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      ApiError.badRequest(
        `Invalid file type: ${file.mimetype}. Allowed types: JPG, JPEG, PNG, WebP`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
    files: env.MAX_FILES_PER_UPLOAD,
  },
});

/** Single image upload field */
const uploadSingle = upload.single('image');

/** Multiple images upload field (up to MAX_FILES_PER_UPLOAD) */
const uploadMultiple = upload.array('images', env.MAX_FILES_PER_UPLOAD);

module.exports = { uploadSingle, uploadMultiple, ALLOWED_MIME_TYPES };
