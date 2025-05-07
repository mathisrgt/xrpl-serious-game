import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    wallets: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        pubkey: String,
        privkey: String
    }],
    grades: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        grade: { type: Number }
    }],
    status: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        state: { type: String, enum: ['done', 'inProgress', 'notStarted'], default: 'notStarted' }
    }],
    metaData: mongoose.Schema.Types.Mixed
}, { timestamps: true })

ActivitySchema.index({ course: 1, student: 1 });

export default mongoose.model('Activity', ActivitySchema);