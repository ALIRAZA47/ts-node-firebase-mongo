import express from 'express'
import globalResponseHandler from '../../utils/global/response.handler'
import asyncHandler from '../../utils/router.methods'
import { UserService } from '../../services/user/user.service'
import validateRequestBody from '../../middlewares/validate.request.body.mw'
import {
    PersonalizeUserValidation,
    SignUpUserValidation,
    UsernamesValidation,
    VerifyEmailValidation,
} from './validations/create.user.validation'
import { LoginValidation } from './validations/login.validation'
import { CREATED, NO_CONTENT, OK } from 'http-status'

// vars
const userRouter = express.Router()
const userService = new UserService()

// routes
userRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            OK,
            'Users List',
            await userService.getAllUsers(),
        )
    }),
)

userRouter.post(
    '/is-username-taken',
    validateRequestBody(UsernamesValidation),
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            OK,
            'Username availability',
            await userService.isUsernameTaken(req),
        )
    }),
)
userRouter.get(
    '/logged-in',
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            OK,
            'Logged In User',
            await userService.getLoggedInUser(req),
        )
    }),
)
userRouter.post(
    '/',
    validateRequestBody(SignUpUserValidation),
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            OK,
            'User Created',
            await userService.createUser(req),
        )
    }),
)

userRouter.post(
    '/login',
    validateRequestBody(LoginValidation),
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            OK,
            'User Token',
            await userService.login(req),
        )
    }),
)
userRouter.patch(
    '/verify-email',
    validateRequestBody(VerifyEmailValidation),
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            NO_CONTENT,
            'Verify Email',
            await userService.verifyEmail(req),
        )
    }),
)


export default userRouter
