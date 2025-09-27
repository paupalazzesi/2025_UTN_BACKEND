import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        verified_email: {
            type: Boolean,
            required: true,
            default: false
        },
        created_at: {
            type: Date, 
            default: Date.now
        },
        modified_at: {
            type: Date, 
            default: Date.now
        },
        active: {
            type: Boolean,
            default: true
        }
    }
)

const Users = mongoose.model('User', userSchema)

export default Users