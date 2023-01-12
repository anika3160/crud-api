import * as dotenv from 'dotenv';
import createUsersServer from './modules/servers/users.js';
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

const server = createUsersServer(users);
server.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('error', err => {
    console.log(err)
})