import express, { Request, Response } from 'express';
import * as inscribeController from '../controllers/inscribeController';
import { Inscribe } from '../models/inscribemodel';

const inscribeRouter = express.Router();
 
inscribeRouter.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    console.log(req.body)
    inscribeController.create(newInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

inscribeRouter.get('/', async (req: Request, res: Response) => {
    inscribeController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

inscribeRouter.get('/:cod_e/:cod_a/:id_p/:grupo', async (req: express.Request, res: express.Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_a = parseInt(req.params.cod_a);
    const id_p = parseInt(req.params.id_p);
    const grupo = req.params.grupo;
    
    inscribeController.getById(cod_e,cod_a, id_p, grupo, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Inscripcion no encontrada' });
        }
 
        res.status(result.statusCode).json(result);
    });
});


inscribeRouter.put('/:cod_e/:cod_a/:id_p/:grupo', async (req: express.Request, res: express.Response) => {
    const { cod_e, cod_a, id_p, grupo } = req.params;

    const updatedInscribe: Inscribe = { ...req.body, cod_e, cod_a, id_p, grupo };

    inscribeController.update(updatedInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

inscribeRouter.delete('/:cod_e/:cod_a/:id_p/:grupo', async (req: express.Request, res: express.Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const cod_a = parseInt(req.params.cod_a);
    const id_p = parseInt(req.params.id_p);
    const grupo = req.params.grupo;

    inscribeController.remove(cod_e, cod_a, id_p, grupo, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

export {inscribeRouter};