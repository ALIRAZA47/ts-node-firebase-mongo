import Joi from 'joi'

export const SignUpUserValidation = Joi.object().keys({
    username: Joi.string().required().min(3),
})

export const PersonalizeUserValidation = Joi.object().keys({
    name: Joi.string().optional(),
})

export const VerifyEmailValidation = Joi.object().keys({
    verificationCode: Joi.string().required(),
})

export const UsernamesValidation = Joi.object().keys({
    username: Joi.string().required(),
})

export const EmailValidation = Joi.object().keys({
    email: Joi.string().email().required(),
})
