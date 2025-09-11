import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
    {
         name: {
            type: String,
            required: true
        },
        url_image: {
            type: String,
            required: true
        },
        modified_at: {
            type: Date,
            default: null
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean,
            default: true
        }

    }
)

const Workspace = mongoose.model('Workspace', WorkspaceSchema)

export default Workspace