import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import process from 'node:process';
import os from 'node:os';
import createUsersServer from './modules/servers/users.js';
import createProxyServer from './modules/servers/proxy.js';

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
    console.log(`Worker ${worker.process.pid} died`);
  });

  const proxy = createProxyServer(PORT, numCPUs);
  proxy.listen((PORT), () => {
    console.log(`Proxy Server is running on port ${PORT}`)
  });

} else {
  const id: number = Number(cluster?.worker?.id);
  const workerPort: number = PORT + id;
  const usersServer = createUsersServer(users);
  usersServer.listen((workerPort), () => {
    console.log(`Server is running on port ${workerPort}`);
  })

  usersServer.on('error', err => {
    console.log(err)
  })

  console.log(`Worker ${process.pid} started`);
}