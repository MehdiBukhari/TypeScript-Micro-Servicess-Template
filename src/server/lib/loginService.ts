import * as semver from 'semver';
import Config from '../../config';

class LoginService {
  private user: any;
  constructor(log: any) {
    this.user = {};
  }

  get(): any {
    const sample ='jeffs';
    return sample;
  }
}

export default LoginService;
