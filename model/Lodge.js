import mongoose from 'mongoose';

const LodgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    monthlyRent: {
      type: Number,
      required: true,
      min: 0,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    bookingdate:{
    type: String,
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Lodge = mongoose.model('Lodge', LodgeSchema);

export default Lodge
