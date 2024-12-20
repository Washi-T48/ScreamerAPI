import express from 'express';

const auth = express.Router();

auth.use((req, res, next) => {
    console.log(`AUTH: PASS`);
    next();
});

export default auth;