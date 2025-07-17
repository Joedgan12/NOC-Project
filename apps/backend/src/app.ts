import express from 'express';
import notificationsRouter from './routes/notifications';
import preferencesRouter from './routes/preferences';

const app = express();

app.use('/api/notifications', notificationsRouter);
app.use('/api/preferences', preferencesRouter);

export default app;