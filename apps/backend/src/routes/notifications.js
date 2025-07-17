"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
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
exports.default = router;
