import http from 'http';
import * as dotenv from 'dotenv';
import { validate as uuidValidate } from 'uuid';
import { getUserById, createOrUpdateUser } from './modules/database.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

interface IUser {
    readonly id: string,
    username: string,
    age: number,
    hobbies: string[],
}
let users: IUser[] = [];

enum ContentType {
    text = 'text/html',
    json = 'application/json',
}

enum Method {
    get = "GET",
    post = "POST",
    put = "PUT",
    delete = "DELETE",
}

const server = http.createServer((req, res) => {
    const sendResponse = (statusCode:number, contentType:string, data?:any):void => {
        res.writeHead(statusCode, {
            'Content-Type': contentType
        });
        if (data) {
            res.write(typeof data === 'string' ? data : JSON.stringify(data))
        }
        res.end();
    }

    try {
        console.log(`Server request ${req.url} ${req.method}`)

        const routesEl: string[] | undefined = req.url?.split('/');
        if (req.url === '/api/users') {
            switch(req.method) {
                case Method.get: {
                    sendResponse(200, ContentType.json, users);
                    break;
                }
                case Method.post: {
                    let data = '';
                    req.on('data', chunk => {
                        data += chunk;
                    })
                    req.on('end', () => {
                        try {
                            const dataFromReq = data ? JSON.parse(data) : undefined;
                            const newUser: IUser = createOrUpdateUser(dataFromReq?.name, 
                                dataFromReq?.age,
                                dataFromReq?.hobbies);
                            users.push(newUser);
                            sendResponse(201, ContentType.json, newUser);
                        } catch (error: any) {
                            sendResponse(400, ContentType.text, error.message);
                        }
                    })
                        break;
                    }
                    default:
                        sendResponse(500, ContentType.text, 'Method deprecated.');
                        break;
            }
        } else if (req.url?.indexOf('/api/users/') === 0 && routesEl?.length === 4) {
            const isValidId = uuidValidate(routesEl[3]);
            const currentUser = getUserById(routesEl[3], users);

            if (isValidId) {
                if (currentUser) {
                    switch(req.method) {
                        case Method.get: {
                            sendResponse(200, ContentType.json, currentUser);
                            break;
                        }
                        case Method.put: {
                            let data = '';
                            req.on('data', chunk => {
                                data += chunk;
                            })
                            req.on('end', () => {
                                try {
                                    const dataFromReq = data ? JSON.parse(data) : undefined;
                                    const newUserData: IUser = createOrUpdateUser(dataFromReq?.name, 
                                        dataFromReq?.age,
                                        dataFromReq?.hobbies,
                                        routesEl[3]);
                                    users = users.filter(user => user.id !== routesEl[3]);
                                    users.push(newUserData);
                                    sendResponse(200, ContentType.json, newUserData);
                                } catch (error: any) {
                                    sendResponse(400, ContentType.text, error.message);
                                }
                            })
                            break;
                        }
                        case Method.delete: {
                            users = users.filter(user => user.id !== routesEl[3]);
                            sendResponse(204, ContentType.text);
                            break;
                        }
                        default: 
                            sendResponse(500, ContentType.text, 'Method deprecated.');
                            break;
                    }
                } else {
                    sendResponse(404, ContentType.text, `Record with ${routesEl[3]} === userID doesn't exist`);
                }
            } else {
                sendResponse(400, ContentType.text, 'User id is invalid (not uuid).');
            }
        } else {
            sendResponse(404, ContentType.text, 'Unknown URL.');
        }
    } catch (error: any) {
        sendResponse(500, ContentType.text, error.message);
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
