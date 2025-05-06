const db = require('better-sqlite3')('dados.db', {
    verbose: console.log
});

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    cpf CHAR(14) PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    profile VARCHAR(7) NOT NULL
);
`;
db.exec(createUsersTable);

const createPhonesTable = `
CREATE TABLE IF NOT EXISTS phones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf CHAR(14) NOT NULL,
    phone_number TEXT NOT NULL,
    FOREIGN KEY (cpf) REFERENCES users(cpf) ON DELETE CASCADE
);
`;
db.exec(createPhonesTable);

const createEmailsTable = `
CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf CHAR(14) NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (cpf) REFERENCES users(cpf) ON DELETE CASCADE
);
`;
db.exec(createEmailsTable);