import HttpException from '../utils/global/httpException'
import { NextFunction, Request, Response } from 'express'
import { FORBIDDEN } from '../common/constants/statusCodes'

// import * as passport from 'passport'
import { authMiddleware } from '../common/constants/ExcludedRoutes.json'
import { auth } from 'firebase-admin'
import UserModel from '../models/user.model'

const authenticationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const excludedRoutes = authMiddleware[req.method]
    const reqUrl = req.originalUrl
    if (
        excludedRoutes &&
    excludedRoutes.length &&
    excludedRoutes.includes(reqUrl)
    ) {
        return next()
    } else {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '')
            if (!token)
                return next(
                    new HttpException(FORBIDDEN, 'Token is not present in the Header!'),
                )
            const decodedToken = await auth().verifyIdToken(token)
            if (decodedToken) {
                const fUser = await auth().getUser(decodedToken.uid)
                const user = await UserModel.findOne({
                    fuid: decodedToken.uid,
                })
                req['firebaseUser'] = fUser
                req['user'] = user
                next()
            } else {
                return next(new HttpException(FORBIDDEN, 'Invalid access/id token'))
            }
        } catch (error) {
            return next(new HttpException(FORBIDDEN, 'Invalid or expired token!'))
        }
    }
}

export default authenticationMiddleware
