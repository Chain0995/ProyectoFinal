import express, { Request, Response } from 'express';
import * as imparteController from '../controllers/imparteController';
import { Imparte } from '../models/impartemodel';

const imparteRouter = express.Router();
 
imparteRouter.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body;
    console.log(req.body)
    imparteController.create(newImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.get('/', async (req: Request, res: Response) => {
    imparteController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.get('/:id_p/:cod_a/:grupo', async (req: express.Request, res: express.Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = req.params.grupo;
    
    imparteController.getById(id_p, cod_a, grupo, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Impartición no encontrada' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

imparteRouter.get('/:id_p', async (req: express.Request, res: express.Response) => {
    const id_p = parseInt(req.params.id_p);
    
    imparteController.getByPro(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Impartición no encontrada' });
        }
 
        res.status(result.statusCode).json(result);
    });
});
imparteRouter.get('/:cod_a', async (req: express.Request, res: express.Response) => {
    const cod_a = parseInt(req.params.cod_a);
    
    imparteController.getByAsi(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        if (!result) {
            return res.status(404).json({ 'message': 'Impartición no encontrada' });
        }

        res.status(result.statusCode).json(result);
    });
});


imparteRouter.put('/:id_p/:cod_a/:grupo', async (req: express.Request, res: express.Response) => {
    const { id_p, cod_a, grupo } = req.params;

    const updatedImparte: Imparte = { ...req.body, id_p, cod_a, grupo };

    imparteController.update(updatedImparte, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

imparteRouter.delete('/:id_p/:cod_a/:grupo', async (req: express.Request, res: express.Response) => {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = req.params.grupo;

    imparteController.remove(id_p, cod_a, grupo, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(result.statusCode).json(result);
    });
});

export {imparteRouter};