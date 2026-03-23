import mongoose from 'mongoose';

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.model('Zone', zoneSchema);
