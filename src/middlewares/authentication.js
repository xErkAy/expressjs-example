import {AuthenticationErrorMessage, CustomErrorMessage} from '../utils/exceptions.js'
import * as jwt from '../utils/jwt.js'
import {prisma} from "../../index.js";

export const jwtAuthenticationMiddleWare = async (req, res, next) => {
    if (req.path.includes('/api/auth/')) return next();

    let token = req.headers.authorization;
    if (!token) return next(new CustomErrorMessage('Authorization token not found', 401))

    try {
        token = token.split('Bearer ')[1]
        const user = jwt.decodeToken(token)
        req.user = await prisma.user.findFirst({
            where: {
                id: user.id,
                username: user.username
            }
        })
        await next()
    } catch (err) {
        console.log('Authorization error: ', err)
        await next(new AuthenticationErrorMessage('Invalid token'))
    }
}
