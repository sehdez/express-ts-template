import mongoose, { Connection } from 'mongoose';
import config from 'config';
import winston from 'winston';

const MONGODB_URI: string = config.get('mongodbUri') || '';

let mainConnection: Connection | null = null;

export const getCompanyDb = async (companyId: string | number): Promise<Connection> => {
  if (!mainConnection) {
    winston.info('Creating main database connection...');
    mainConnection = mongoose.createConnection(MONGODB_URI);

    mainConnection.on('error', (err) => {
      winston.error('MongoDB connection error:', err);
    });

    mainConnection.on('connected', () => {
      winston.info('MongoDB connection established');
    });
  }
  const db = mainConnection.useDb(`company_${companyId}`);
  winston.info(`Connected successfully to the database: company_${companyId}`);

  return db;
};
