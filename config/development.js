require('dotenv').config();

module.exports = {
  port: process.env.PORT_DEVELOPMENT,
  production: false,
  authorization: {
    username: process.env.AUTH_API_USERNAME_DEVELOPMENT,
    password: process.env.AUTH_API_PASSWORD_DEVELOPMENT,
  },
  mongodbUri: process.env.MONGODB_URI_DEVELOPMENT,
  loggerLevel: process.env.LOGGER_LEVEL_DEVELOPMENT,
};
