import { Request } from 'express'
import UserModel from '../../models/user.model'
import * as process from 'process'
import HttpException from '../../utils/global/httpException'
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
} from '../../common/constants/statusCodes'
import { v5 } from 'uuid'
import { auth } from 'firebase-admin'
import { UserStatusEnum } from '../../common/enums/user/user.status.enum'
import { getUserFromRequest } from '../../utils/user.utils'
import { UserRequestService } from './http-request/user.request.service'

export class UserService {
    private readonly userRequestService: UserRequestService =
        new UserRequestService()

    async getAllUsers(): Promise<string> {
        return 'In development'
    }

    async getUserById(): Promise<string> {
        return 'In development'
    }

    async isUsernameTaken(req: Request): Promise<boolean> {
        const user = await UserModel.findOne({ username: req.body.username })
        return !!user
    }

    async getLoggedInUser(req: Request) {
        const user = req['user']
        const fUser = req['firebaseUser']
        return user
    }

    async verifyEmail(req): Promise<string> {
        const { verificationCode } = req.body
        const user = await UserModel.findOne({
            verificationCode,
        })
        const emailVerificationUuid = v5(user.email, process.env.UUID_NAMESPACE)
        if (emailVerificationUuid === verificationCode) {
            await auth().updateUser(user.fuid, {
                emailVerified: true,
            })
            await UserModel.updateOne(
                { fuid: user.fuid },
                { status: UserStatusEnum.PROFILE_PENDING },
            )
            return 'Email verified'
        } else {
            throw new HttpException(BAD_REQUEST, 'Invalid verification code')
        }
    }

    async resendVerificationEmail(req): Promise<string> {
        const user = getUserFromRequest(req)
        return 'Verification email sent'
    }

    async login(req: Request) {
        const { email, password } = req.body
        const creds = await this.userRequestService.loginFirebaseUser(
            email,
            password,
        )
        return creds
    }

    async createUser(req: Request) {
        try {
            const { username } = req.body
            const { uid: fuid, email } = req['firebaseUser']
            const modeledUserData = new UserModel({
                fuid,
                email,
                username,
            })
            const savedUserData = await modeledUserData.save()
            return savedUserData
        } catch (e) {
            throw new HttpException(INTERNAL_SERVER_ERROR, 'Error creating user')
        }
    }

    async personalize(req: Request) {
        try {
            const { name, category } = req.body
            const { fuid } = req['user']
            await UserModel.update(
                { fuid },
                {
                    name,
                    category,
                    status: UserStatusEnum.ACTIVE,
                },
                {
                    upsert: true,
                },
            )
        } catch (e) {
            throw new HttpException(
                INTERNAL_SERVER_ERROR,
                'Error updating/inserting user personalization data',
            )
        }
    }
}
