import http from 'http';
import service from './server/server';
import Config from './config/index';

const config = new Config('debug');
const server: any = http.createServer(service);

async function initialize() {
  server.listen(process.env.PORT || 3000);
  server.on('listening', () => {
    config.log.info(
      `Hi there! I'm listening on port ${
        server.address().port
      } in ${service.get('env')} mode.`
    );
  });
}

initialize();

/* const http = require('http');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const service = require('../server/service')(config);

const server = http.createServer(service);

// Important - a service should not have a fixed port but should randomly choose one
server.listen(process.env.PORT || 3000);

server.on('listening', () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${service.get('env')} mode.`,
  );
});
 */
