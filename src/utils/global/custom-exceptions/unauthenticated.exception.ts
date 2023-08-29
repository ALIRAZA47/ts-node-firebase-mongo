export class UnauthenticatedException extends Error {
    statusCode = null

    constructor(message: any) {
        super(message)
        Error.captureStackTrace(this, this.constructor)

        this.name = this.constructor.name
        this.message = message
        this.statusCode = 403
    }
}
