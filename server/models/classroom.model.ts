import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

classroomSchema.index({ organisation: 1, name: 1 });

export default mongoose.model('Classroom', classroomSchema);
