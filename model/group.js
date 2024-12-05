import mongoose from "mongoose";
const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true })

export const Group = mongoose.model("Group", GroupSchema)