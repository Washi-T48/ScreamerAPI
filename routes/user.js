import Router from "express";
const user = Router();

user.all("/", (req, res) => {
    res.sendStatus(200);
});

export default user;