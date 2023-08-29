import { is24DigitHex } from './string.methods'

export const validateObjectId = (value, helpers) => {
    if (!is24DigitHex(value)) {
        return helpers.error('any.custom')
    }
    return value
}
