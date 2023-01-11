import * as dotenv from 'dotenv';
import createServer from './modules/server.js';
import process from 'node:process';

dotenv.config();
const PORT:number = Number(process.env.PORT) || 3000;
interface IUser {
  readonly id: string,
  username: string,
  age: number,
  hobbies: string[],
}
let users: IUser[] = [];

const server = createServer(users);
server.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('error', err => {
    console.log(err)
})