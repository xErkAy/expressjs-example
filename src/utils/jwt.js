import jsonWebToken from "jsonwebtoken";
import * as settings from '../configs/settings.js'

export const encodeToken = (payload) => {
    return jsonWebToken.sign(payload, settings.secretKey, {
        algorithm: settings.jwt.algorithm,
        expiresIn: settings.jwt.expirationTime
    })
}
export const decodeToken = (token) => {
    if (!jsonWebToken.verify(token, settings.secretKey)) {
        console.log(123)
    }
    return jsonWebToken.decode(token)
}