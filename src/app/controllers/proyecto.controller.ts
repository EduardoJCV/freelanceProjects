import { TareaModel } from '../models/tarea.model';
import { TipoProyectoModel } from '../models/tipo-proyecto.model';
import { TipoProyectoController } from './tipo-proyecto.controller';

export class ProyectoController {
    id:number;
    nombre:string;

    fechaInicio:Date;
    fechaLimite:Date;
    fechaTerminada:Date;
    diasTrabajar: any[];
    horasTrabajar: any;

    tipo: TipoProyectoModel;

    terminada:boolean;
    avance:number;
    descripcion:string;
    tareas: TareaModel[];

    constructor( nombre:string, tipo:string ){

        this.id = new Date().getTime();
        this.nombre = nombre;

        this.fechaInicio = new Date();
        this.fechaLimite = null;
        this.fechaTerminada = null;
        this.diasTrabajar = [
            { val: 'Domingo', isChecked: false },
            { val: 'Lunes', isChecked: true },
            { val: 'Martes', isChecked: true },
            { val: 'Miercoles', isChecked: true },
            { val: 'Jueves', isChecked: true },
            { val: 'Viernes', isChecked: true },
            { val: 'Sabado', isChecked: false }
        ];
        this.horasTrabajar = {
            tipo: 'HD',
            data: { value: 5 }
        }; 
        this.tipo = new TipoProyectoController( tipo );

        this.terminada = false;
        this.avance = 0;
        this.descripcion = "";
        this.tareas = [];
    }
}