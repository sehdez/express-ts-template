import { Application } from 'express';
import httpStatus from 'http-status';
import ApiRoutes from './api/api.routes';
import { ApiError } from '../modules/errors';
import { apiBasicAuthorization } from '../middlewares/auth';
import catchAsync from '../modules/common/plugins/catchAsync';

export default class Routes {
  public app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public setRoutes(): void {
    this.app.use('/api', apiBasicAuthorization, catchAsync(ApiRoutes.router));
    this.app.get('/', (req, res) => {
      res.respond(
        { message: 'Welcome to Water api', version: '0.0.1', status: 'Running' },
        httpStatus.OK
      );
    });

    this.app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Route Not found'));
    });
  }
}
