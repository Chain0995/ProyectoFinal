import * as dontenv from 'dotenv';
import express, {Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import {db} from './DB';
import {estudianteRouter} from './src/routes/estudianteRouter';
import {profesorRouter} from './src/routes/profesorRouter';
import {asignaturaRouter} from './src/routes/asignaturaRouter';
import {imparteRouter} from './src/routes/imparteRouter';
import {inscribeRouter} from './src/routes/inscribeRouter';
import cors from 'cors';

const app = express();
dontenv.config();

app.use(cors());
app.use(bodyParser.json())
app.get('/',(req, res)=>{
    res.type('text/plain');
    res.status(200).send('welcome')
});

app.use('/estudiantes',estudianteRouter);
app.use('/profesores',profesorRouter);
app.use('/asignaturas',asignaturaRouter);
app.use('/imparte',imparteRouter);
app.use('/inscribe',inscribeRouter);

db.connect((err)=>{
    if(err){
        console.log('Database connection error');
    }else{
        console.log('Database connected');
    }
});

app.use((req: Request,res: Response)=>{
    res.status(404).send({error:'Not found',menssage: 'URL noy found'});
});

app.listen(process.env.port,()=>{
    console.log('Node server started running ');
    console.log(`go to http://${process.env.HOST}:${process.env.port}`)
})

