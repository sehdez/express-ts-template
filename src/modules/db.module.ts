import mongoose from 'mongoose';
import config from 'config';
import winston from 'winston';

const MONGODB_URI: string = config.get('mongodbUri') || '';
export const adminDB = mongoose.createConnection(MONGODB_URI, { dbName: 'ADMIN' });

export function onDBConnectionsReady(callback: () => void): void {
  const connections = [adminDB];
  const readyConnections: mongoose.Connection[] = [];
  connections.forEach((connection) => {
    connection.on('connected', () => {
      readyConnections.push(connection);
      winston.info(`Connected to MongoDB: db ${connection.name}`);
      if (readyConnections.length === connections.length) {
        callback();
      }
    });
  });
}
