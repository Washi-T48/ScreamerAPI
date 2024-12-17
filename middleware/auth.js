import express from 'express';

const auth = express.Router();

auth.use((req, res, next) => {
    console.log(`AUTH: ${req.headers.key}`);
    next();
});

export default auth;