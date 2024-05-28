import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) return next(errorHandler(401, 'Invalid token'))

    jwt.verify(token, 'SECRET KEY', (error, decodedUser) => {
        if (error) return next(errorHandler(403, 'Invalid Token'))
        req.decodedUser = decodedUser

        next()
    })
}
