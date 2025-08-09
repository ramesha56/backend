const Review = require('../models/Review');

const createReview = async (req, res) => {
  try {
    const { styleId, rating, text } = req.body;

    const review = new Review({
      styleId,
      userId: req.user.id,
      userName: req.user.name,
      rating,
      text,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Review creation failed' });
  }
};

const getReviewsForStyle = async (req, res) => {
  try {
    const reviews = await Review.find({ styleId: req.params.styleId });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Deletion failed' });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const { text, rating } = req.body;

    review.text = text || review.text;
    review.rating = rating || review.rating;

    await review.save();
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};

module.exports = {
  createReview,
  getReviewsForStyle,
  deleteReview,
  updateReview,
};