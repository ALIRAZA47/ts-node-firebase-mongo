import { Schema } from 'mongoose'

const BaseSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    },
)
export default BaseSchema
