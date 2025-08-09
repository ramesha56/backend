// backend/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hijabId: { type: String, required: true }, 
  user: { type: String, required: true },    
  rating: { type: Number, required: true },
  review: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
