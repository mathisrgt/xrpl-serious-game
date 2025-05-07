import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['draft', 'active', 'archived'], default: 'draft' },
    activatedAt: { type: Date },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    students: [{
      username: { type: String },
      status: { type: String, enum: ['accepted', 'requested'], default: 'requested' }
    }]
  }, { timestamps: true })

classroomSchema.index({ organisation: 1, name: 1 });

export default mongoose.model('Classroom', classroomSchema);