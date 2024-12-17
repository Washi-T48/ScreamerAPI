import Database from 'better-sqlite3'

const db = new Database('db.sqlite3', { verbose: console.log });

export default db;