import http from 'http';
import * as dotenv from 'dotenv';
import { validate as uuidValidate } from 'uuid';
import { getUserById, createUser } from './db.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const users = [];

const server = http.createServer((req, res) => {
    console.log(`Server request ${req.url} ${req.method}`)

    const routesEl = req.url.split('/');
    // console.log(routesEl);

    if (req.url === '/api/users') {
        switch(req.method) {
            case 'GET': {
                res.writeHead(200, {
                    'Content-Type': 'text/json'
                });
                res.write(JSON.stringify(users))
                res.end();
                break;
            }
            case 'POST': {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                })
                req.on('end', () => {
                    const dataFromReq = JSON.parse(data);
                    const newUser = createUser(dataFromReq.name, dataFromReq.age, dataFromReq.hobbies);
                    users.push(newUser);
                    res.writeHead(201, {
                        'Content-Type': 'text/json'
                    });
                    res.write(JSON.stringify(newUser))
                    res.end();
                })
                    break;
                }
                default:
                    break;
        }
    } else if (req.url.indexOf('/api/users/') === 0 && routesEl.length === 4) {
        const isValidId = uuidValidate(routesEl[3]);
        const currentUser = getUserById(routesEl[3], users);

        switch(req.method) {
            case 'GET': {
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
                break;
            }
            default: 
                break;
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.write('Unknown URL')
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
