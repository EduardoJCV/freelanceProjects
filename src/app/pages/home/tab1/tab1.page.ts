import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TiempoService } from 'src/app/services/tiempo/tiempo.service';
import { CalendarComponentOptions } from 'ion2-calendar'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  fechaActual = new Date();
  hoy = new Date();



  items = [1,2,3,4,5,6];
  slideOpts = {
    initialSlide: this.fechaActual.getDay(), speed: 400
  };
  diasDeLaSemana = [ 
    { dia: "Domingo", date: '', actividades: [] },
    { dia: "Lunes", date: '', actividades: [] },
    { dia: "Martes", date: '', actividades: [] },
    { dia: "Miercoles", date: '', actividades: [] },
    { dia: "Jueves", date: '', actividades: [] },
    { dia: "Viernes", date: '', actividades: [] },
    { dia: "Sabado", date: '', actividades: [] }
  ];


  onSelect = ()=>{
    console.log('asdasd');
  }
  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    color: 'primary',
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    daysConfig: []
  };

  

  constructor( public tiempo: TiempoService, public modalController: ModalController ) {






    // console.log(this.fechaActual.getDay())
    this.fechaActual.setDate( this.fechaActual.getDate() - this.fechaActual.getDay() );
    for (let i = 0; i <= 6; i++) {
      if ( `${this.fechaActual}` == `${this.hoy}` ) {
        this.diasDeLaSemana[i].date = `${this.fechaActual.getDate()} de ${this.meses[this.fechaActual.getMonth()]} / Hoy`;
        this.fechaActual.setDate( this.fechaActual.getDate() + 1 );
      }else{
        this.diasDeLaSemana[i].date = `${this.fechaActual.getDate()} de ${this.meses[this.fechaActual.getMonth()]}`;
        this.fechaActual.setDate( this.fechaActual.getDate() + 1 );
      }
    }

    this.fechaActual = new Date();

    this.cargarActividades();
    
  }

  cargarActividades(){
    for (let i = 0; i < this.tiempo.actividades.length; i++) {
      for (let a = 0; a < this.tiempo.actividades[i].dias.length; a++) {
        if (this.tiempo.actividades[i].dias[a].isChecked == true) {
          let fec = new Date();
          if ( this.tiempo.actividades[i].horario.tipo == 'horarioFijo' ) {
            fec.setHours( Number(this.tiempo.actividades[i].horario.content.hI.split(':')[0]) );
            fec.setMinutes( Number(this.tiempo.actividades[i].horario.content.hI.split(':')[1]) );
            this.tiempo.actividades[i].fecha = fec;
            this.diasDeLaSemana[a].actividades.push(this.tiempo.actividades[i]);
          }else{
            fec.setHours( 0 );
            fec.setMinutes( 0 );
            this.tiempo.actividades[i].fecha = fec;
            this.diasDeLaSemana[a].actividades.push(this.tiempo.actividades[i]);
          }
        }
        this.diasDeLaSemana[a].actividades.sort(function (a, b){
          return ( a.fecha - b.fecha )
        })
      }      
    }
  }

  empezarTarea(){
    console.log('asdasd')
  }
  infoTarea(){
    console.log('info')
  }

  init(){
    console.log('asdasd');
  }

  comprobarHora(actividad){
    if (actividad.horario.tipo == 'horasDiarias') {
      return;
    }
    let fecha = new Date();
    let hora = `${fecha.getHours()}:${fecha.getMinutes()}`;
    let horaArrStr = hora.split(':');
    let horaArrNum = [];
    for (let i = 0; i < horaArrStr.length; i++) {
      horaArrNum[i] = Number(horaArrStr[i]);
    }
    let horaInicioArrStr = actividad.horario.content.hI.split(':');
    let horaInicioArrNum = [];
    for (let i = 0; i < horaInicioArrStr.length; i++) {
      horaInicioArrNum[i] = Number(horaInicioArrStr[i]);
    }
    let horaFinalArrStr = actividad.horario.content.hF.split(':');
    let horaFinalArrNum = [];
    for (let i = 0; i < horaFinalArrStr.length; i++) {
      horaFinalArrNum[i] = Number(horaFinalArrStr[i]);
    }
    if ( horaArrNum[0] >= horaInicioArrNum[0] && horaArrNum[0] <= horaFinalArrNum[0] ) {
      return 'success';
    }else {
      return;
    }
    
  }



  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: NuevaActividadComponent,
  //     cssClass: 'my-custom-class'
  //   });
  //   this.tiempo.instance.close();
  //   return await modal.present();
  // }

}
