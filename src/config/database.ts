import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id
    },
})
export const connectDB: () => Promise<void> = async () => {
    try {
        const dbUrl = process.env.MONGO_CONNECTION_STRING
        const conn = await mongoose.connect(dbUrl)
        console.debug(
            `MongoDB connected to host: ${conn.connection.db.databaseName} at ${conn.connection.host}:${conn.connection.port}`,
        )
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

export const disconnectDB: () => Promise<void> = async () => {
    try {
        await mongoose.connection.close()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
