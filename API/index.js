import express from 'express';
import cors from 'cors';

import logger from './middleware/logger.js';
import auth from './middleware/auth.js';
import device from './routes/device.js';
import report from './routes/report.js';
import user from './routes/user.js';

const app = express();
app.use(logger);
app.use(auth);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.all('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/device', device);
app.use('/report', report);
app.use('/user', user);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});