import * as bunyan from 'bunyan';
import pjson from '../../package.json';

class Config {
  public name: string;

  public version: string;

  public static readonly serviceTimeout: number = 30;

  public log: any;

  constructor(level: string) {
    this.name = pjson.name;
    this.version = pjson.version;
    this.log = this.getLogger(level);
  }

  private getLogger(level: any) {
    return bunyan.createLogger({ name: `${this.name}:${this.version}`, level });
  }
}

export default Config;
