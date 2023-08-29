import HttpException from '../utils/global/httpException'
import { isEmpty } from '../utils/object.methods'
import joiValidateOptions from '../common/constants/validations/joi'
import { BAD_REQUEST } from 'http-status'

const validateRequestBody = (schema) => {
    return (req, res, next) => {
        if (isEmpty(req.body)) {
            throw new HttpException(BAD_REQUEST, `Cannot ${req.method} empty body`)
        } else {
            const { error } = schema.validate(req.body, joiValidateOptions)
            const valid = error == null

            if (valid) {
                next()
            } else {
                const { details } = error
                // push all the errors into an array
                const message = []
                details.forEach((err) => {
                    message.push({
                        errMessage: err.message,
                        errDetails: {
                            key: err.context.key,
                            label: err.context.label,
                            path: err.path,
                        },
                    })
                })
                throw new HttpException(BAD_REQUEST, message)
            }
        }
    }
}
export default validateRequestBody
