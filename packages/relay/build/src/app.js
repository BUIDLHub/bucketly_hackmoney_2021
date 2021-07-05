"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbFunctions_1 = __importDefault(require("./functions/dbFunctions"));
const monitor_1 = __importDefault(require("./monitor/monitor"));
const app = express_1.default();
dbFunctions_1.default.initDatabase();
monitor_1.default.startL1BucketMonitor();
exports.default = app;
