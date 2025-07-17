"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRealtimeService = startRealtimeService;
exports.emitTestEvent = emitTestEvent;
exports.emitNotification = emitNotification;
exports.emitTopicNotification = emitTopicNotification;
exports.startNotificationService = startNotificationService;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
function startRealtimeService(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
        socket.on('event', (event) => {
            console.log('Received event:', event);
            io.emit('event', event);
        });
    });
}
function emitTestEvent(io) {
    setInterval(() => {
        const testEvent = {
            type: 'test',
            payload: { message: 'This is a test event' },
            timestamp: new Date().toISOString(),
        };
        console.log('Emitting test event:', testEvent);
        io.emit('event', testEvent);
    }, 5000); // Emit every 5 seconds
}
function emitNotification(io, notification) {
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
    firebase_admin_1.default.messaging().send(message)
        .then((response) => {
        console.log('Push notification sent successfully:', response);
    })
        .catch((error) => {
        console.error('Error sending push notification:', error);
    });
}
function emitTopicNotification(io, topic, notification) {
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
    firebase_admin_1.default.messaging().send(message)
        .then((response) => {
        console.log('Push notification sent successfully to topic:', response);
    })
        .catch((error) => {
        console.error('Error sending push notification to topic:', error);
    });
}
// Example usage
function startNotificationService(io) {
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
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
