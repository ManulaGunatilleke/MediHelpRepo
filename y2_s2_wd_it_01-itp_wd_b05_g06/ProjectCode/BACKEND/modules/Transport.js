const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransportSchema = new Schema({
  driverName: {
    type: String,
    required: true,
  },

  passengerCount: {
    type: String,
    required: true,
  },

  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },

  transportType: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  transportStatus: {
    type: String,
    required: true,
  },
});

const Transport = mongoose.model("Transport", TransportSchema);
module.exports = Transport;
