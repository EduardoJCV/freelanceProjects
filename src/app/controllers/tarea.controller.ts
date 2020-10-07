import { SubTareaController } from './sub-tarea.controller';

export class TareaController {
    id:number;
    nombre:string;
    descripcion:string;
    fechaLimite:Date;
    fechaTerminada:Date;
    terminada:boolean;
    avance:number;
    subTareas: SubTareaController[];

    constructor( nombre:string ){
        this.id = new Date().getTime();
        this.nombre = nombre;
        this.descripcion = "";
        this.fechaLimite = null;
        this.fechaTerminada = null;
        this.terminada = false;
        this.avance = 0;
        this.subTareas = [];
    }
}