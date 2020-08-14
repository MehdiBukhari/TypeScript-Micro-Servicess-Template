import express = require('express');
import Config from '../config';
import LoginService from './lib/loginService';
import { Request, Response, NextFunction } from 'express';

class Server {
  public express: any;

  private config: Config;

  private loginService: LoginService;

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

    this.loginService = new LoginService(this.config.log);

    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    // eslint-disable-next-line no-unused-vars
    /* router.use((error: any, req: Request, res: Response) => {
      res.status(error.status || 500);
      this.config.log.error(error);
      return res.json({
        error: {
          message: error.message
        }
      });
    }); */

    router.get('/list', (req, res) => {
      return res.json('Not implemented');
    });

    router.get('/list-short', (req, res) => {
      return res.json('Not implemented');
    });

    this.express.use('/', router);
  }
}

export default new Server().express;
