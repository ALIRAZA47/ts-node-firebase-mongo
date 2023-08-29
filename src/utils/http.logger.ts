import bunyan from 'bunyan'
import HttpException from './global/httpException'

const errSerializer = (err) => {
    if (err instanceof HttpException) {
        return {
            statusCode: err.statusCode,
            message: err.message,
            stack: err.stack,
        }
    }
    return err
}

// Setup Bunyan, adding splunkStream to the array of streams
const HttpLogger = bunyan.createLogger({
    name: 'Pinsleaf API',
    streams: [
        {
            level: 'info',
            path: 'api-req-logs.log',
        },
    ],
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
        err: errSerializer,
    },
    hostname: 'localhost',
    source: 'pinsleaf-api',
    src: true,
})
export default HttpLogger
