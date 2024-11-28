"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const DB_1 = require("../../DB");
const create = (inscribe, callback) => {
    const queryString = 'INSERT INTO inscribe (cod_e,cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
    console.log(inscribe);
    DB_1.db.query(queryString, [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Inscripcion creada exitosamente',
            data: {
                cod_e: inscribe.cod_e,
                cod_a: inscribe.cod_a,
                id_p: inscribe.id_p,
                grupo: inscribe.grupo,
                n1: inscribe.n1,
                n2: inscribe.n2,
                n3: inscribe.n3
            }
        });
    });
};
exports.create = create;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM inscribe';
    DB_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const inscribes = [];
        rows.forEach(row => {
            const inscribe = {
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3,
            };
            inscribes.push(inscribe);
        });
        callback(null, {
            statusCode: 200,
            message: 'Inscripciones obtenidas exitosamente',
            data: inscribes
        });
    });
};
exports.getAll = getAll;
const getById = (cod_e, cod_a, id_p, grupo, callback) => {
    const queryString = 'SELECT * FROM inscribe WHERE cod_e =? AND cod_a = ? AND id_p = ?  AND grupo = ?';
    DB_1.db.query(queryString, [cod_e, cod_a, id_p, grupo], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const inscribe = {
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3,
            };
            callback(null, {
                statusCode: 200,
                message: 'Inscripcion obtenida exitosamente',
                data: inscribe
            });
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Inscripcion no encontrada'
            });
        }
    });
};
exports.getById = getById;
const update = (inscribe, callback) => {
    const queryString = 'UPDATE inscribe SET n1 = ?, n2 = ?,n3 = ? WHERE cod_e =? AND cod_a = ? AND id_p = ? AND grupo = ?'; //pendiente
    DB_1.db.query(queryString, [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Inscripcion actualizada exitosamente',
            data: {
                cod_e: inscribe.cod_e,
                cod_a: inscribe.cod_a,
                id_p: inscribe.id_p,
                grupo: inscribe.grupo,
                n1: inscribe.n1,
                n2: inscribe.n2,
                n3: inscribe.n3
            }
        });
    });
};
exports.update = update;
const remove = (cod_e, cod_a, id_p, grupo, callback) => {
    const queryString = 'DELETE FROM inscribe WHERE cod_e =? AND cod_a = ? AND id_p = ?  AND grupo = ?';
    DB_1.db.query(queryString, [cod_e, cod_a, id_p, grupo], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Inscripcion eliminada exitosamente'
        });
    });
};
exports.remove = remove;
