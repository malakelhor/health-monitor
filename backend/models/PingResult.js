const mongoose = require('mongoose');

const PingResultSchema = new mongoose.Schema({
  endpointId: { type: mongoose.Schema.Types.ObjectId, ref: 'Endpoint', required: true },
  statusCode: { type: Number },
  responseTime: { type: Number },
  status: { type: String, enum: ['up', 'slow', 'down'], default: 'up' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PingResult', PingResultSchema);