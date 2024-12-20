import db from '../config/conn.js';

const createReport = async (data) => {
    const stmt = db.prepare('INSERT INTO reports (deviceID, time, status) VALUES (?, ?, ?)');
    return stmt.run(data.deviceID, data.time, data.status);
};

const listReport = async () => {
    const stmt = db.prepare('SELECT * FROM reports');
    return stmt.all();
};

const listDetected = async () => {
    const stmt = db.prepare('SELECT * FROM reports WHERE status = \'detected\'');
    return stmt.all();
};

const listReportByDevice = async (data) => {
    const stmt = db.prepare('SELECT * FROM reports WHERE deviceID = ?');
    return stmt.get(data.deviceID);
};

const updateReport = async (data) => {
    const stmt = db.prepare('UPDATE reports SET status = ? WHERE deviceID = ?');
    return stmt.run(data.status, data.deviceID);
};

const deleteReport = async (data) => {
    const stmt = db.prepare('DELETE FROM reports WHERE deviceID = ?');
    return stmt.run(data.deviceID);
};

export {
    createReport,
    listReport,
    listDetected,
    listReportByDevice,
    updateReport,
    deleteReport,
};