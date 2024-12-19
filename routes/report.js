import Router from 'express';
const report = Router();

import {
    createReport,
    listReport,
    listReportByDevice,
    updateReport,
    deleteReport,
} from '../models/report.js';

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

report.get('/list/:deviceID', async (req, res) => {
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
        const { deviceID, status } = req.body;
        if (!deviceID) { throw new Error('deviceID is required'); }
        console.log(await updateReport({ deviceID, status }));
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

report.get("/piReport/:deviceID/:status", async (req, res) => {
    try {
        const { deviceID, status } = req.params;
        if (!deviceID || !status) { throw new Error('deviceID and status are required'); }
        const result = await createReport({ deviceID, time: new Date().toISOString(), status });
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

export default report;