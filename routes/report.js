import express, { Router } from 'express';

const report = express.Router();

report.all('/', (req, res) => {
    res.sendStatus(200);
});

report.post('/new', async (req, res) => {
    try {
        const { deviceID, time, status } = req.body;
        if (!deviceID) { throw new Error('deviceID is required'); }
        const result = await createReport({ deviceID, time, status })
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(402);
        console.log(e);
    }
});

report.get('/list', async (req, res) => {
    try {
        const result = await listReport();
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

Router.get('/list/:deviceID', async (req, res) => {
    try {
        const { deviceID } = req.params;
        if (!deviceID) { throw new Error('deviceID is required'); }
        const result = await listReportByDevice({ deviceID });
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(400);
    }
});

report.post('/update', async (req, res) => {
    try {
        const { deviceID, time, status } = req.body;
        if (!deviceID) { throw new Error('deviceID is required'); }
        console.log(await updateReport({ deviceID, time, status }));
        res.sendStatus(200);
    } catch (e) {
        res.send(e.message).status(400);
    }
});

report.post('/delete', async (req, res) => {
    try {
        const { reportID } = req.body;
        if (!reportID) { throw new Error('reportID is required'); }
        console.log(await deleteReport({ reportID }));
        res.sendStatus(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});