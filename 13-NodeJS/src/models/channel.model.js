import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
    {
        name: {
        type:String,
        required: true
        },
        // esta propiedad es la relacion tipo FK, 
        // con que otro schema queremos referenciar
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },
        private: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        modified_at: {
            type: Date,
            default: null
        } 

    }
)

const Channel = mongoose.model('Workspace', ChannelSchema)

export default Channel