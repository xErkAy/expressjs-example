import bcrypt from 'bcrypt'

export const getHashedPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const comparePasswords = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}