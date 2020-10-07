import { SubTareaModel } from './sub-tarea.model';

export interface TareaModel {
    id:number;
    nombre:string;
    descripcion:string;
    fechaLimite:Date;
    fechaTerminada:Date;
    terminada:boolean;
    avance:number;
    subTareas: SubTareaModel[];
}