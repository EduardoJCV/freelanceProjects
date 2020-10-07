import { TareaModel } from './tarea.model';
import { TipoProyectoModel } from './tipo-proyecto.model';

export interface ProyectoModel {
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
}