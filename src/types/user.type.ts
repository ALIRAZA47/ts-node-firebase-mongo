import { BaseSchemaType } from './base.schema.type'

interface IUser extends BaseSchemaType {
  fuid: string
  name: string
  category: string
  username: string
  email: string
  status: string
  verificationCode?: string
  stripeCustomerId: string | null
}

export { IUser }
