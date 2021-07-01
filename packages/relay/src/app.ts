import express from 'express';
import dbFunctions from './functions/dbFunctions';
import monitor from './monitor/monitor';

const app = express();
dbFunctions.initDatabase();
monitor.startL1BucketFactoryMonitor();

export default app;