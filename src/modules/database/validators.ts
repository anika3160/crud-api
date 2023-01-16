export const isValidName = (name: any): boolean => {
    return (typeof name === 'string' && name !== '')
}

export const isValidAge = (age: any): boolean => {
    return (typeof age === 'number' && age === age)
}

export const isValidHobbies = (hobbies: any): boolean => {
    if (Array.isArray(hobbies)) {
        const onlyStringHobbies: any = hobbies.filter(hobby => typeof hobby === 'string');
        return (hobbies.length === 0 || onlyStringHobbies.length === hobbies.length)
    }
    return false;
}
 