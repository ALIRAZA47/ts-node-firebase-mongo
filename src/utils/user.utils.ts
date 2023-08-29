import { IUser } from '../types/user.type'
import { UserRecord } from 'firebase-admin/lib/auth'
import { Request } from 'express'
import { NotFoundException } from './global/custom-exceptions/not.found.exception'

export const getUserFromRequest = (req: Request): IUser => {
    const user = req['user']
    if (!user) {
        throw new NotFoundException('User not found in request')
    }
    return user
}

export const getFirebaseUserFromRequest = (req: Request): UserRecord =>
    req['firebaseUser']
