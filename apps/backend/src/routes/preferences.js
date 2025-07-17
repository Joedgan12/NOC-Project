"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
exports.default = router;
