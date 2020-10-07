import {PersonalModel, ContratoModel, AyudaModel} from '../models/tipo-proyecto.model';


class PersonalController {
    descripcion: string;
    constructor(){
        this.descripcion = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor esse necessitatibus quidem rerum eveniet porro hic? Aliquid, a ipsa iure doloremque quis assumenda repellat repudiandae, ipsum laboriosam, ipsam quibusdam architecto?";
    }
}
class ContratoController {
    descripcion:string;
    precio: number;
    impuestos: number;
    precioImpuestos: number;
    constructor(){
        this.descripcion = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor esse necessitatibus quidem rerum eveniet porro hic? Aliquid, a ipsa iure doloremque quis assumenda repellat repudiandae, ipsum laboriosam, ipsam quibusdam architecto?";
        this.precio = 1;
        this.impuestos = 0;
        this.precioImpuestos = 1;
    }
}
class AyudaController {
    descripcion:string;
    ayudandoA: string;
    descripcionAyuda: string;
    constructor(){
        this.descripcion = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor esse necessitatibus quidem rerum eveniet porro hic? Aliquid, a ipsa iure doloremque quis assumenda repellat repudiandae, ipsum laboriosam, ipsam quibusdam architecto?";
        this.ayudandoA = "";
        this.descripcionAyuda = "";
    }
}

export class TipoProyectoController {
    tipo:string;
    color:string;
    content: PersonalModel | ContratoModel | AyudaModel;
    constructor( tipo: string ){
        switch (tipo) {
            case "personal":
                this.tipo = tipo;
                this.color = 'success';
                this.content = new PersonalController();
                break;
            case "contrato":
                this.tipo = tipo;
                this.color = 'danger';
                this.content = new ContratoController();
                break;
            case "ayuda":
                this.tipo = tipo;
                this.color = 'secondary';
                this.content = new AyudaController();
                break;
            default:
                console.log('Error');
                break;
        }
    }

}