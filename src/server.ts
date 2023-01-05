import mongoose = require('mongoose');
import http = require('http');
import app from './app';



const normalizePort = (val: number | string): number | string | boolean => {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
};


const onError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') throw error;
    const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);
const server = http.createServer(app);


const onListening = (): void => {
    const addr = server.address();
    const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
    console.log(`Listening on ${bind}`);
};

server.on('listening', onListening);
server.on('error', onError);

mongoose
  .connect("mongodb://localhost:27017/institut")
  .then(() => {
    console.log('Connected to database ' + process.env.MONGO_URI);
    server.listen(port);
  })
  .catch((err) => {
    console.log(err);
    throw new Error('Error on connecting to database');
  });