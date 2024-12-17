import db from '../config/conn.js';

const createDevice = async (data) => {
    const stmt = db.prepare('INSERT INTO device (deviceID, name, location, latitude, longtitude) VALUES (?, ?, ?, ?, ?)');
    return stmt.run(data.deviceID, data.name, data.location, data.latitude, data.longtitude);
};

const getDeviceInfo = async (data) => {
    const stmt = db.prepare('SELECT * FROM device WHERE deviceID = ?');
    return stmt.get(data.deviceID);
};

const getDeviceList = async () => {
    const stmt = db.prepare('SELECT * FROM device');
    return stmt.all();
};

const updateDevice = async (data) => {
    const stmt = db.prepare('UPDATE device SET name = ?, location = ?, latitude = ?, longtitude = ? WHERE deviceID = ?');
    return stmt.run(data.name, data.location, data.latitude, data.longtitude, data.deviceID);
};

const deleteDevice = async (data) => {
    const stmt = db.prepare('DELETE FROM device WHERE deviceID = ?');
    return stmt.run(data.deviceID);
};

export {
    createDevice,
    getDeviceInfo,
    getDeviceList,
    updateDevice,
    deleteDevice,
};