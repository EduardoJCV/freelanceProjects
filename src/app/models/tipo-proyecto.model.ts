export interface PersonalModel {
    descripcion:string;
}
export interface ContratoModel {
    descripcion: string;
    precio: number;
    impuestos: number;
    precioImpuestos: number;
}
export interface AyudaModel {
    descripcion:string;
    ayudandoA: string;
    descripcionAyuda: string;
}

export interface TipoProyectoModel {
    tipo:string;
    color:string;
    content: PersonalModel | ContratoModel | AyudaModel;
}