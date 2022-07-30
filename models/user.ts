import { Schema, models, model } from 'mongoose'
interface UserType {
    email: string,
    lists: {
        list: string,
        anime: number[]
    }[]
}

const UserSchema = new
Schema<UserType>({
    email: {
        type: String,
        required: true
    },
    lists: {
        type: [{
            list: {
                type: String,
                unique: true
            },
            anime: [Number]
        }],
        default: []
    }
})

const User = models.user || model('user', UserSchema)

export default User