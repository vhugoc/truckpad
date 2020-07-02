/** @module ModelCheckin */

const { model, Schema } = require('mongoose');

const CheckinSchema = new Schema({
  trucker_id: String,
  type: String
}, {
  timestamps: true
});

module.exports = model('Checkin', CheckinSchema);
