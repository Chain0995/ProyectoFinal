import express, { Request, Response } from 'express';
import * as profesorController from '../controllers/profesorController';
import { Profesor } from '../models/profesormodel';

const profesorRouter = express.Router();
 
profesorRouter.post('/', async (req: Request, res: Response) => {
    const newProfesor: Profesor = req.body;
    console.log(req.body)
    profesorController.create(newProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

profesorRouter.get('/', async (req: Request, res: Response) => {
    profesorController.getAll((err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

profesorRouter.get('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    profesorController.getById(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        if (!result) {
            return res.status(404).json({ 'message': 'Profesor no encontrado' });
        }
 
        res.status(result.statusCode).json(result);
    });
});

profesorRouter.put('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const updatedProfesor: Profesor = { ...req.body, id_p };
 
    profesorController.update(updatedProfesor, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});

profesorRouter.delete('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
 
    profesorController.remove(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
 
        res.status(result.statusCode).json(result);
    });
});
export {profesorRouter};