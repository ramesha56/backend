

// // routes/reviewsRouts.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


router.post('/', async (req, res) => {
  const { hijabId, user, rating, review } = req.body;

  if (!hijabId || !user || !rating || !review) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newReview = new Review({ hijabId, user, rating, review });
    await newReview.save();
    res.status(201).json({ message: 'Review saved to DB' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.get('/:hijabId', async (req, res) => {
  try {
    const hijabReviews = await Review.find({ hijabId: req.params.hijabId });
    res.json(hijabReviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});


router.put('/:id', async (req, res) => {
  const { rating, review } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, review },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review updated', updatedReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update review' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
