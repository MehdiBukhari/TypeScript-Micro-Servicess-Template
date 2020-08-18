import http from 'http';
import axios from 'axios';
import service from './server/server';
import Config from './config/index';

const config = new Config('debug');
const server: any = http.createServer(service);

async function initialize() {
  server.listen(0);
  server.on('listening', () => {
    const registerService = () =>
      axios.put(
        `http://localhost:3000/register/${config.name}/${config.version}/${
          server.address().port
        }`
      );
    const UnregisterService = () =>
      axios.delete(
        `http://localhost:3000/register/${config.name}/${config.version}/${
          server.address().port
        }`
      );
    registerService();
    const interval = setInterval(registerService, 20000);
    const cleanup = async () => {
      clearInterval(interval);
      await UnregisterService();
    };

    config.log.info(
      `Hi there! I'm listening on port ${
        server.address().port
      } in ${service.get('env')} mode.`
    );
  });
}

initialize();
