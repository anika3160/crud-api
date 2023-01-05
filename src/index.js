import http from 'http';
import * as dotenv from 'dotenv';
import { validate as uuidValidate } from 'uuid';
import { getUserById, createUser } from './db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const users = [];
users.push(createUser('Anna', 26, ['ski', 'codding']));


const server = http.createServer((req, res) => {
    console.log(`Server request ${req.url} ${req.method}`)

    const routesEl = req.url.split('/');
    console.log(routesEl);

// get user by id
   if (routesEl.length === 4
        && routesEl[1] === 'api'
        && routesEl[2] === 'users'
        && req.method === 'GET') {
            const isValidId = uuidValidate(routesEl[3]);
            const currentUser = getUserById(routesEl[3], users);

            if (isValidId) {
                if (currentUser) {
                    res.writeHead(200, {
                        'Content-Type': 'text/json'
                    });
                    res.write(JSON.stringify(currentUser))
                    res.end();
                } else {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    res.write(`Record with ${routesEl} === userID doesn't exist`)
                    res.end();
                }
            } else {
                res.writeHead(400, {
                    'Content-Type': 'text/html'
                });
                res.write('User id is invalid (not uuid)')
                res.end();
            }
        }
    
    switch(req.url) {
        case '/':
            break;
        case '/api/users': {
            if (req.method === 'GET') {
                res.writeHead(200, {
                    'Content-Type': 'text/json'
                });
                res.write(JSON.stringify(users))
                res.end();
            }
            break;
        }
        default:
            // res.writeHead(404, {
            //     'Content-Type': 'text/html'
            // });
            // res.write('Non defined')
            // res.end();
            break;
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})