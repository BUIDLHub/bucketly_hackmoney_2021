import app from './app';
import config from './config/config';

const PORT = config.server.port;

app.listen(PORT, () => (console.log(`Server listening at ${PORT}`)));