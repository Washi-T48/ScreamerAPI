import express from 'express';

const auth = express.Router();

auth.use((req, res, next) => {
    console.log(`AUTH: ${req.headers.authorization}`);
    next();
});

export default auth;