/** @module ModelTrucker */

const { model, Schema } = require('mongoose');

const TruckerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  have_vehicle: {
    type: Boolean,
    required: false,
    default: false
  },
  cnh_type: {
    type: String,
    required: true
  },
  is_loaded: {
    type: Boolean,
    required: false,
    default: false
  },
  vehicle_type: {
    type: String,
    required: true
  },
  origin: {
    lat: {
      type: String,
      required: false
    },
    lng: {
      type: String,
      required: false
    }
  },
  destiny: {
    lat: {
      type: String,
      required: false
    },
    lng: {
      type: String,
      required: false
    }
  }
});

module.exports = model('Trucker', TruckerSchema);
