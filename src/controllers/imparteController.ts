import { Imparte } from '../models/impartemodel';
import { db } from '../../DB';
import { RowDataPacket } from 'mysql2';
import { Response } from 'express';
 
export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    console.log(imparte)
    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
        (err) => {
            if (err) { callback(err); }
 
            //const insertId = (<OkPacket>result).insertId;
            //callback(null, insertId);
 
            callback(null, {
                statusCode: 201,
                message: 'Imparticion creada exitosamente',
                data: {
                    id_p: imparte.id_p,
                    cod_a: imparte.cod_a,
                    grupo: imparte.grupo
                }
            });
        }
    );
};


export const getAll = (callback: Function) => {
  const queryString = 'SELECT * FROM imparte';
 
  db.query(queryString, (err, result) => {
      if (err) { callback(err); }
     
      const rows = <RowDataPacket[]>result;
      const impartes: Imparte[] = [];
      rows.forEach(row => {
          const imparte: Imparte = {
              id_p: row.id_p,
              cod_a: row.cod_a,
              grupo: row.grupo,
              horario: row.horario,
          };
          impartes.push(imparte);
      });
      callback(null, {
          statusCode: 200,
          message: 'Imparticiones obtenidas exitosamente',
          data: impartes
      });
  });
};

export const getById = (id_p: number, cod_a: number, grupo: string, callback: Function) => {
    const queryString = 'SELECT * FROM imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';

    db.query(queryString, [id_p, cod_a, grupo], (err, result) => {
        if (err) { callback(err); }
    
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const imparte: Imparte = {
                id_p: row.id_p,
                cod_a: row.cod_a,
                grupo: row.grupo,
                horario: row.horario,
            };
            callback(null, {
                statusCode: 200,
                message: 'Imparticion obtenida exitosamente',
                data: imparte
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Imparticion no encontrada'
            });
        }
  });
};

export const update = (imparte: Imparte, callback: Function) => {
    const queryString = 'UPDATE imparte SET grupo = ?, horario = ? WHERE id_p = ? AND cod_a = ?';

    db.query(
        queryString,
        [imparte.grupo, imparte.horario, imparte.id_p,imparte.cod_a],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 200,
                message: 'Imparticion actualizada exitosamente',
                data: {
                    id_p: imparte.id_p,
                    cod_a: imparte.cod_a,
                    grupo: imparte.grupo,
                    horario: imparte.horario
                }
            });
        }
    );
};


export const remove = (id_p: number, cod_a: number, grupo: string, callback: Function) => {
    const queryString = 'DELETE FROM imparte WHERE id_p = ? AND cod_a = ? AND grupo = ?';

    db.query(
        queryString,
        [id_p, cod_a, grupo],
        (err) => {
            if (err) { callback(err); }

            callback(null, {
                statusCode: 200,
                message: 'Impartición eliminada exitosamente'
            });
        }
    );
};

/*export function getByMultipleAttributes(id_p: number, cod_a: number, grupo: string, callback: (err: Error | null, result?: Response) => void) {
    try {
        // Simulación de búsqueda en la base de datos
        const result = {
            statusCode: 200,
            message: 'Imparte encontrada exitosamente',
            data: {
                id_p: id_p,
                cod_a: cod_a,
                grupo: grupo
            },
            headers: {} // Necesario para cumplir con el tipo Response
        } as unknown;

        callback(null, result as Response);
    } catch (error) {
        if (error instanceof Error) {
            callback(error, null);
        } else {
            const errorMessage = "An unexpected error occurred";
            console.error("Error:", error);
            callback(new Error(errorMessage), null);
        }
    }
}*/