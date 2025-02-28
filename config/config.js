// Load environment variables from the .env file
require('dotenv').config();
console.log(process.env.JWT_SECRET);
const config = {
    JWT_SECRET: process.env.JWT_SECRET || 'thisismysecretkey',  // Use the JWT secret from .env or fallback to a default
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASS,
    fileUploadPath: process.env.FILE_UPLOAD_PATH,
    maxFileUpload: process.env.MAX_FILE_UPLOAD,
    dbUri: process.env.LOCAL_DATABASE_URI,
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    jwtCookieExpire: process.env.JWT_COOKIE_EXPIRE || '30',
};

module.exports = config;