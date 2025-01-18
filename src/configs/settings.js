import { dirname } from 'node:path';
const __dirname = import.meta.dirname;

export const secretKey = '87r291kxjsw812jsk93'
export const jwt = {
    expirationTime: '1h',
    algorithm: 'HS256',
}

export const staticDir = {
    shortPath: 'static/',
    fullPath: `${dirname(__dirname)}/static/`,
}
