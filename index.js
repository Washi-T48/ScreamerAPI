import express from 'express';

import logger from './middleware/logger.js';
import auth from './middleware/auth.js';
import device from './routes/device.js';

const app = express();
app.use(logger);
app.use(auth);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.all('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/device', device);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});