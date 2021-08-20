import { model, Schema } from 'mongoose'
import { userInterface } from '../interfaces/authinterfaces'

const userSchema = new Schema({
    googleId: String,
    displayName: String
})

export default model<userInterface>('User', userSchema)