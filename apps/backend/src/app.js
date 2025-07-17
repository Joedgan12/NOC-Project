"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const preferences_1 = __importDefault(require("./routes/preferences"));
const app = (0, express_1.default)();
app.use('/api/notifications', notifications_1.default);
app.use('/api/preferences', preferences_1.default);
exports.default = app;
