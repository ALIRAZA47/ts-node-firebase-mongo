import Joi from 'joi'

const LoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
export { LoginValidation }
