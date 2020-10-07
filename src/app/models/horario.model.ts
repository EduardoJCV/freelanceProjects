
interface HorarioFijoModel {
    valor:number;
}


// interface hiDataModel{
//     value:number;
// }
// interface hIModel {
//     tipo:string;
//     data: hiDataModel;
// }


// interface hFModel {

// }

interface HorasDiariasModel {
    hI: string;
    hF: string;
}




export interface HorarioModel {

    tipo:string;

    content: HorarioFijoModel | HorasDiariasModel;
}