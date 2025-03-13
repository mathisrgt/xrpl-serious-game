import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    content: { type: String, required: true },
    grades: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, submission: { type: String }, grade: { type: Number, min: 0, max: 100 } }],
    status: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, status: { type: String, enum: ['notStarted', 'inProgress', 'completed'] } }]
}, { timestamps: true });

ActivitySchema.index({ course: 1, student: 1 });

export default mongoose.model('Activity', ActivitySchema);