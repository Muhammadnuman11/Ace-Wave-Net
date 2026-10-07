import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    planId: { type: Number, required: true },
    planSlug: { type: String, required: true },
    provider: { type: String, required: true },
    providerSlug: { type: String, required: true },
    planName: { type: String, required: true },
    planType: { type: String, required: true },
    speed: { type: String, required: true },
    monthlyPrice: { type: String, required: true },
    zip: { type: String, required: true },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    installAddress: { type: String, required: true },
    phone: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'confirmed', 'active', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    processedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
