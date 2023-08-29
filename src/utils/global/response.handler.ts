import { Request, Response } from 'express'
import HttpLogger from '../http.logger'
import { index } from '../generators'
import HttpException from './httpException'
import { logSeverity, logTypes } from '../../common/constants/types'

const globalResponseHandler = (
    req: Request,
    res: Response,
    statusCode: number,
    message?: any,
    data: any = null,
    errors: any = null,
) => {
    const responseData = {
        statusCode: statusCode,
        message: message,
        data: data,
        errors: errors,
        status: 'success',
    }

    if (statusCode >= 400) {
        const err = new HttpException(statusCode, message)
        HttpLogger.error(
            {
                log_id: index(),
                log_type: logTypes.REQ_RES,
                log_severity: logSeverity.ERROR,
                req,
                err,
            },
            'Error processing request',
        )
        delete responseData.data
        responseData.status = 'error'
    } else {
        HttpLogger.info(
            {
                log_id: index(),
                log_type: logTypes.REQ_RES,
                log_severity: logSeverity.INFO,
                req,
                res,
            },
            'Request processed successfully',
        )
        delete responseData.errors
    }
    res.status(statusCode).send(responseData)
}

export default globalResponseHandler
