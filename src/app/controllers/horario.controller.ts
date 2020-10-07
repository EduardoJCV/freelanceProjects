
class HorarioFijo {
    valor:number;
    constructor(content){
        this.valor = content.valor;
    }
}

class HorasDiarias {
    hI;
    hF;
    constructor(content){
        this.hI = content.hI;
        this.hF = content.hF;
    }
}

export class Horario {

    tipo:string;

    content: HorarioFijo | HorasDiarias;
    constructor( tipo: string, content:any ){
        switch (tipo) {
            case "horarioFijo":
                this.tipo = tipo;
                this.content = new HorarioFijo(content);
                break;
            case "horasDiarias":
                this.tipo = tipo;
                this.content = new HorasDiarias(content);
                break;
            default:
                console.log('Error');
                break;
        }
    }

}