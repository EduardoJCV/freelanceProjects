export class SubTareaController {
    nombre:string;
    terminada:boolean;
    
    constructor( nombre:string ){
        this.nombre = nombre;
        this.terminada = false;
    }
}