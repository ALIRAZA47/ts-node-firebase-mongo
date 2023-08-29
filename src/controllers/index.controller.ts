import { Router } from 'express'
import globalResponseHandler from '../utils/global/response.handler'
import HomeService from '../services'
import userRouter from './user/user.controller'
import { OK } from 'http-status'
import asyncHandler from '../utils/router.methods'
import { ActuatorHealth } from '../../health/actuator.health'

const rootRouter = Router({ mergeParams: true })

const homeService = new HomeService()
// router functions
rootRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        return globalResponseHandler(
            req,
            res,
            OK,
            'Pinsleaf Home',
            await homeService.appHome(),
        )
    }),
)

rootRouter.use(ActuatorHealth)
rootRouter.use('/users', userRouter)

export default rootRouter
