import * as dotenv from 'dotenv';
import createUsersServer from './modules/servers/users.js';
import process from 'node:process';
import { updateUsersData } from './modules/database/database.js';

dotenv.config();
const PORT:number = Number(process.env.PORT) || 3000;

await updateUsersData([]);
const server = createUsersServer();
server.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`)
})

server.on('error', (err: any) => {
    console.log(err)
})