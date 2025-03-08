import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    documents: [{ type: String }]
}, { timestamps: true });

courseSchema.index({ title: 1 });

export default mongoose.model('Course', courseSchema);
