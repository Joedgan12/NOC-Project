import express from 'express';
const router = express.Router();

// Mock database for user preferences
const userPreferences = new Map();

// Endpoint to get user preferences
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const preferences = userPreferences.get(userId) || {};
  res.json(preferences);
});

// Endpoint to update user preferences
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const preferences = req.body;
  userPreferences.set(userId, preferences);
  res.status(200).json({ message: 'Preferences updated successfully' });
});

export default router;