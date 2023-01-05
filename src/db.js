import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export const getUserById = (id, users) => users.find(user => user.id === id);

export const createUser = (username, age, hobbies) => {
    return ({ id: uuidv4(), username, age, hobbies })
}
