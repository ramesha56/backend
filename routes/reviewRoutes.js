// // routes/reviewsRouts.js
// const express = require('express');
// const router = express.Router();

// let reviews = []; // ✅ Use DB in real app!

// router.post('/', (req, res) => {
//   const { hijabId, user, rating, review } = req.body;
// if (!hijabId || !user || !rating || !review) {
//    return res.status(400).json({ error: 'All fields are required' });
//   }
//   reviews.push({ hijabId, user, rating, review });
//   res.status(201).json({ message: 'Review added' });
// });


// // router.post('/', (req, res) => {
// //   const { hijabId, user, rating, review } = req.body;
// //   if (!hijabId || !user || !rating || !review) {
// //     return res.status(400).json({ error: 'All fields are required' });
// //   }
// //   reviews.push({ hijabId, user, rating, review });
// //   res.status(201).json({ message: 'Review added' });
// // });

// router.get('/:hijabId', (req, res) => {
//   const hijabId = req.params.hijabId;
//   const hijabReviews = reviews.filter((r) => r.hijabId === hijabId);
//   res.json(hijabReviews);
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Create review
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

// Get reviews for a specific hijab
router.get('/:hijabId', async (req, res) => {
  try {
    const hijabReviews = await Review.find({ hijabId: req.params.hijabId });
    res.json(hijabReviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Update review
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

// Delete review
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
