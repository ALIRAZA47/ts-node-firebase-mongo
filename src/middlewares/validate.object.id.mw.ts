import { isValidObjectId } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import HttpException from '../utils/global/httpException'
import { BAD_REQUEST } from '../common/constants/statusCodes'

function validateObjectIdMw(req: Request, res: Response, next: NextFunction): void {
    if (
        !isValidObjectId(
            req.params.id ||
        req.params.permission_id ||
        req.params.permissionId ||
        req.params.user_id ||
        req.params.userId ||
        req.params.protocol_id ||
        req.params.protocolId,
        )
    ) {
        throw new HttpException(BAD_REQUEST, 'Provided Id is not valid')
    }
    next()
}

export default validateObjectIdMw
