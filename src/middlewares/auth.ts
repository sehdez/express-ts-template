import { Request, Response, NextFunction } from 'express';
import config from 'config';
import httpStatus from 'http-status';
import { ApiError } from '../modules/errors';

export function apiBasicAuthorization(req: Request, res: Response, next: NextFunction) {
  const authorization = req.header('authorization');

  if (!authorization || authorization.indexOf('Basic ') === -1)
    throw new ApiError(401, 'Missing Authorization Header');

  const base64Credentials = authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  const apiUsername: string = config.get('authorization.username');
  const apiPassword: string = config.get('authorization.password');

  if (username !== apiUsername || password !== apiPassword)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Authentication Credentials');

  next();
}
