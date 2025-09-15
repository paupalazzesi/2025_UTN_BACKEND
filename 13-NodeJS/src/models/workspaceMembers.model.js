import mongoose from "mongoose";

const WorkspaceMembersSchema = new mongoose.Schema(
    {
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member',
            required: true
        },       
        created_at: {
            type: Date,
            default: Date.now
        }
    }
)

const WorkspaceMembers = mongoose.model('WorkspaceMembers', WorkspaceMembersSchema)

export default WorkspaceMembers