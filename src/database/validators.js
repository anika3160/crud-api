export const isValidName = (name) => {
    return (typeof name === 'string' && name !== '')
}

export const isValidAge = (age) => {
    return (typeof age === 'number' && age === age)
}

export const isValidHobbies = (hobbies) => {
    if (Array.isArray(hobbies)) {
        const onlyStringHobbies = hobbies.filter(hobby => typeof hobby === 'string');
        return (hobbies.length === 0 || onlyStringHobbies.length === hobbies.length)
    }
    return false
}
 