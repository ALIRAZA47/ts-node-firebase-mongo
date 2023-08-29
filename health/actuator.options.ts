import { Options } from 'express-actuator'

export const ActuatorOptions: Options = {
    basePath: '/mgmt',
    customEndpoints: [
        {
            id: '/ready',
            controller: (req, res) => {
                res.send('<h1>Ready</h1>')
            },
        },
    ],
    infoGitMode: 'simple',
    infoDateFormat: 'YYYY-MM-DD HH:mm:ss',
}
