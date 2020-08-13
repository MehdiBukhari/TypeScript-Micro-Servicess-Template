import express = require('express');
import Config from '../config';
import ServiceRegistry from './lib/ServiceRegistry';
import { Request, Response, NextFunction } from 'express';

class Server {
  public express: any;

  private config: Config;

  private serviceRegistry: ServiceRegistry;

  constructor() {
    this.express = express();

    if (this.express.get('env') === 'development') {
      this.config = new Config('debug');
      this.express.use((req: Request, res: Response, next: NextFunction) => {
        this.config.log.info(`${req.method}: ${req.url}`);
        return next();
      });
    } else if (this.express.get('env') === 'test') {
      this.config = new Config('fatal');
    } else {
      this.config = new Config('info');
    }

    this.serviceRegistry = new ServiceRegistry(this.config.log);

    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    // eslint-disable-next-line no-unused-vars
    router.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500);
        this.config.log.error(error);
        return res.json({
          error: {
            message: error.message
          }
        });
      }
    );

    router.put(
      '/register/:servicename/:serviceversion/:serviceport',
      (req, res) => {
        const { servicename, serviceversion, serviceport } = req.params;
        const serviceip: any = req.connection.remoteAddress?.includes('::')
          ? `[${req.connection.remoteAddress}]`
          : req.connection.remoteAddress;

        const serviceKey = this.serviceRegistry.register(
          servicename,
          serviceversion,
          serviceip,
          serviceport
        );

        return res.json({ result: serviceKey });
      }
    );

    router.delete(
      '/register/:servicename/:serviceversion/:serviceport',
      (req, res, next) => {
        return next('not implemented');
      }
    );

    router.get(
      '/register/:servicename/:serviceversion/:serviceport',
      (req, res, next) => {
        return next('not implemented');
      }
    );

    this.express.use('/', router);
  }
}

export default new Server().express;
