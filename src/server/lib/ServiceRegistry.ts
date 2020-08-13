import * as semver from 'semver';
import Config from '../../config';

class ServiceRegistry {
  private log: any;

  private services: any;

  private timeout: number;

  constructor(log: any) {
    this.log = log;
    this.services = {};
    this.timeout = Config.serviceTimeout;
  }

  get(name: string, version: string): any {
    this.cleanup();
    const candidates = Object.values(this.services).filter(
      (service: any) =>
        service.name === name && semver.satisfies(service.version, version)
    );
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name: string, version: string, ip: string, port: string): string {
    const key = name + version + ip + port;
    let action = 'Updated';

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      action = 'Added';
    }

    this.services[key].timestamp = Math.floor(new Date().getTime() / 1000);
    this.log.debug(
      `${action} service ${name}, version ${version} at ${ip}:${port}`
    );
    return key;
  }

  unregister(name: string, version: string, ip: string, port: string): string {
    const key = name + version + ip + port;
    delete this.services[key];
    this.log.debug(
      `Unregistered services ${name}, version ${version} at ${ip}:${port}`
    );
    return key;
  }

  cleanup(): void {
    const now = Math.floor(new Date().getTime() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log.debug(`Removed service ${key}`);
      }
    });
  }
}

export default ServiceRegistry;
