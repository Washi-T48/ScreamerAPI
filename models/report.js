import db from '../config/conn.js';

const createReport = async (data) => {
    const stmt = db.prepare('INSERT INTO report (deviceID, time, status) VALUES (?, ?, ?)');
    return stmt.run(data.deviceID, data.time, data.status);
};

const listReport = async () => {
    const stmt = db.prepare('SELECT * FROM report');
    return stmt.all();
};

const listReportByDevice = async (data) => {
    const stmt = db.prepare('SELECT * FROM report WHERE deviceID = ?');
    return stmt.get(data.deviceID);
};

const updateReport = async (data) => {
    const stmt = db.prepare('UPDATE report SET time = ?, status = ? WHERE deviceID = ?');
    return stmt.run(data.time, data.status, data.deviceID);
};

const deleteReport = async (data) => {
    const stmt = db.prepare('DELETE FROM report WHERE deviceID = ?');
    return stmt.run(data.deviceID);
};

export {
    createReport,
    listReport,
    listReportByDevice,
    updateReport,
    deleteReport,
};