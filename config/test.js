require('dotenv').config();

module.exports = {
  port: '',
  production: false,
  authorization: {
    username: '',
    password: '',
  },
  mongodbUri: 'mongodb://localhost:27017',
  loggerLevel: '',
};
