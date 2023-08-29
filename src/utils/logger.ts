import { createLogger, format, transports } from 'winston'
import moment from 'moment'

export const Logger = createLogger({
    level: 'debug',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize({
                    level: true,
                    colors: {
                        info: 'blue',
                        error: 'red',
                        warn: 'yellow',
                        debug: 'green',
                        log: 'green',
                    },
                }),
                format.timestamp(),
                format.prettyPrint({
                    colorize: true,
                }),
                format.printf(
                    (info) =>
                        `--> ${moment(info.timestamp).format('lll')} - [${info.level}] - ${info.message}`,
                ),
            ),
        }),
    ],
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    },
})

export const NamespacedLogger = (namespace: string) => {
    return {
        error: (message: string) => {
            Logger.error(`[${namespace}] ${message}`)
        },
        warn: (message: string) => {
            Logger.warn(`[${namespace}] ${message}`)
        },
        info: (message: string) => {
            Logger.info(`[${namespace}] ${message}`)
        },
        debug: (message: string) => {
            Logger.debug(`[ ${namespace} ] ${message}`)
        },
    }
}
