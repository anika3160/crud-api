import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { isValidName, isValidAge, isValidHobbies } from './validators.js';

export const getUserById = (id, users) => users.find(user => user.id === id);

export const createUser = (username, age, hobbies) => {
    if (isValidName(username) && isValidAge(age) && isValidHobbies(hobbies)) {
        return ({ id: uuidv4(), username, age, hobbies })
    }
    throw new Error('Incorrect data or empty field. Please try again with correct data.')
}
