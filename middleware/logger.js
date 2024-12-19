import express from 'express';

const logger = express.Router();
const d = new Date();

logger.use((req, res, next) => {
    console.log(d.toLocaleTimeString(Date.now()), req.socket.remoteAddress, req.method, req.url);
    next();
});

export default logger;