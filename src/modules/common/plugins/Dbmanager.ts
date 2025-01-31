import mongoose, { Connection } from 'mongoose';
import config from 'config';
import winston from 'winston';

const MONGODB_URI: string = config.get('mongodbUri') || '';

const connections: Record<string, Connection> = {};

export const getCompanyDb = async (companyId: string | number): Promise<Connection> => {
  if (connections[companyId]) {
    winston.info(`connected to the database: company_${companyId}`);
    return connections[companyId];
  }

  const newConnection = mongoose.createConnection(MONGODB_URI, {
    dbName: `company_${companyId}`,
  });
  winston.info(`Connected successfully to the database: company_${companyId}`);
  connections[companyId] = newConnection;

  return newConnection;
};
