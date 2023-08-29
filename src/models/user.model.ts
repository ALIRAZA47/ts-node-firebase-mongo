import { model, Schema } from 'mongoose'
import { IUser } from '../types/user.type'
import BaseSchema from './base.model'
import { UserStatusEnum } from '../common/enums/user/user.status.enum'

export const UserSchema = new Schema<IUser>({
    fuid: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    status: {
        type: String,
        default: UserStatusEnum.PENDING,
        enum: [...Object.values(UserStatusEnum)],
    },
    verificationCode: {
        type: String,
    },
}).add(BaseSchema)

const UserModel = model('user', UserSchema)

export default UserModel
