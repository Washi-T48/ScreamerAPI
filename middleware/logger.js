import express from 'express';

const logger = express.Router();

logger.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

export default logger;