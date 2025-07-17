// TypeScript file for real-time services
import { Server } from 'socket.io';
import admin from 'firebase-admin';

interface RealtimeEvent {
  type: string;
  payload: any;
  timestamp: string;
}

export function startRealtimeService(io: Server) {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    socket.on('event', (event: RealtimeEvent) => {
      console.log('Received event:', event);
      io.emit('event', event);
    });
  });
}

export function emitTestEvent(io: Server) {
  setInterval(() => {
    const testEvent: RealtimeEvent = {
      type: 'test',
      payload: { message: 'This is a test event' },
      timestamp: new Date().toISOString(),
    };
    console.log('Emitting test event:', testEvent);
    io.emit('event', testEvent);
  }, 5000); // Emit every 5 seconds
}

export function emitNotification(io: Server, notification: { id: string; title: string; message: string; severity: string; }) {
  const notificationEvent = {
    type: 'notification',
    payload: notification,
    timestamp: new Date().toISOString(),
  };
  console.log('Emitting notification via WebSocket:', notificationEvent);
  io.emit('notification', notificationEvent);

  // Send push notification via FCM
  const message = {
    notification: {
      title: notification.title,
      body: notification.message,
    },
    topic: 'all', // Replace with specific topic or device token
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Push notification sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending push notification:', error);
    });
}

export function emitTopicNotification(io: Server, topic: string, notification: { id: string; title: string; message: string; severity: string; }) {
  const notificationEvent = {
    type: 'notification',
    payload: notification,
    timestamp: new Date().toISOString(),
  };
  console.log(`Emitting notification to topic ${topic} via WebSocket:`, notificationEvent);
  io.to(topic).emit('notification', notificationEvent);

  // Send push notification via FCM
  const message = {
    notification: {
      title: notification.title,
      body: notification.message,
    },
    topic: topic, // Send to specific topic
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Push notification sent successfully to topic:', response);
    })
    .catch((error) => {
      console.error('Error sending push notification to topic:', error);
    });
}

// Example usage
export function startNotificationService(io: Server) {
  setInterval(() => {
    emitNotification(io, {
      id: 'example-id',
      title: 'Example Notification',
      message: 'This is a test notification.',
      severity: 'info',
    });
  }, 10000); // Emit every 10 seconds
}

// Initialize Firebase Admin SDK
const serviceAccount = require('../../config/firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
