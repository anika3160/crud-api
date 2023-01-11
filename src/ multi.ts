import * as dotenv from 'dotenv';
import createServer from './modules/server.js';
import cluster from 'node:cluster';
import process from 'node:process';
import os from 'node:os';
import http from 'http';

dotenv.config();
const PORT:number = Number(process.env.PORT) || 3000;
const numCPUs:number = os.cpus().length;
interface IUser {
  readonly id: string,
  username: string,
  age: number,
  hobbies: string[],
}
let users: IUser[] = [];

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for(let i = 0; i<numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
  const proxy = http.createServer((clientReq, clientRes) => {
      const options = {
        port: 4001,
        method: clientReq.method,
        path: clientReq.url,
        headers: {
            ...clientReq.headers,
            host: '127.0.0.1',
        }
      };
      
      const serverReq = http.request(options, (res) => {
        res.pipe(clientRes);
      });
    
      clientReq.pipe(serverReq);
  })
  
  proxy.listen((PORT), () => {
    console.log(`Proxy Server is running on port ${PORT}`)
  })
} else {
  const id = Number(cluster?.worker?.id);
  const port = PORT + id;
  const server = createServer(users);
  server.listen((port), () => {
    console.log(`Server is running on port ${port}`)
  })

  server.on('error', err => {
    console.log(err)
  })

  console.log(`Worker ${process.pid} started`);
}