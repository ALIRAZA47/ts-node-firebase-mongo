import { isURL } from 'class-validator'

export const is24DigitHex = (hexCode) => {
    const re = /^([0-9a-f]{24}){1,2}$/i
    return re.test(hexCode)
}

export const isValidURL = (url: string) =>
    isURL(url, {
        require_tld: process.env.APP_ENV !== 'development',
    })
