const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  attempts: { type: Number, default: 0 },
  sentAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailLog', emailLogSchema);
