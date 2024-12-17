import express from 'express';
import {
    createDevice,
    getDeviceInfo,
    getDeviceList,
    updateDevice,
    deleteDevice,
} from '../models/device.js';

const device = express.Router();

device.all('/', (req, res) => {
    res.sendStatus(200);
});

device.post('/create', async (req, res) => {
    try {
        const { deviceID, name, location, latitude, longtitude } = req.body;
        if (!deviceID) { throw new Error('deviceID is required'); }
        const result = await createDevice({ deviceID, name, location, latitude, longtitude })
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

device.get('/info/:deviceID', async (req, res) => {
    try {
        const { deviceID } = req.params;
        if (!deviceID) { throw new Error('deviceID is required'); }
        const result = await getDeviceInfo({ deviceID });
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

device.get('/list', async (req, res) => {
    try {
        const result = await getDeviceList();
        res.send(result).status(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

device.post('/update', async (req, res) => {
    try {
        const { deviceID, name, location, latitude, longtitude } = req.body;
        if (!deviceID) { throw new Error('deviceID is required'); }
        console.log(await updateDevice({ deviceID, name, location, latitude, longtitude }));
        res.sendStatus(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

device.post('/delete', async (req, res) => {
    try {
        const { deviceID } = req.body;
        if (!deviceID) { throw new Error('deviceID is required'); }
        console.log(await deleteDevice({ deviceID })); res.sendStatus(200);
        res.sendStatus(200);
    } catch (e) {
        res.send(e.message).status(400);
        console.log(e);
    }
});

export default device;