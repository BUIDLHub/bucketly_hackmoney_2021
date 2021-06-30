"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monitor_1 = __importDefault(require("./monitor/monitor"));
const app = express_1.default();
monitor_1.default.startL1BucketFactoryMonitor();
exports.default = app;