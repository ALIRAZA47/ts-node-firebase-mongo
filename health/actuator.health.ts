import actuator from 'express-actuator'
import { ActuatorOptions } from './actuator.options'

export const ActuatorHealth = actuator(ActuatorOptions)
