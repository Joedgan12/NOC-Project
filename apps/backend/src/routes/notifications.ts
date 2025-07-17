import * as express from 'express';
const router = express.Router();

// Mock database for notifications
const notifications = [
  { id: '1', title: 'High CPU Usage', message: 'OLT-001 is experiencing high CPU usage.', severity: 'critical', userId: 'user1', timestamp: '2025-07-16T10:00:00Z' },
  { id: '2', title: 'Fiber Cut Detected', message: 'A fiber cut has been detected in the East Zone.', severity: 'high', userId: 'user2', timestamp: '2025-07-16T11:00:00Z' },
  { id: '3', title: 'Latency Spike', message: 'BNG is experiencing a latency spike.', severity: 'medium', userId: 'user1', timestamp: '2025-07-16T12:00:00Z' },
];

// Endpoint to fetch notifications for a specific user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userNotifications = notifications.filter((n) => n.userId === userId);
  res.json(userNotifications);
});

export default router;