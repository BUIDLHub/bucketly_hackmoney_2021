import express from 'express';
import monitor from './monitor/monitor';

const app = express();
monitor.startL1BucketFactoryMonitor();

export default app;