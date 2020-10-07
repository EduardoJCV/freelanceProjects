import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { AlertController } from '@ionic/angular';
import { TareaModel } from 'src/app/models/tarea.model';
import { TareaController } from 'src/app/controllers/tarea.controller';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.page.html',
  styleUrls: ['./proyecto.page.scss'],
})
export class ProyectoPage {

  proyecto;


  tareas:boolean = true;

  constructor(private router: Router , private alert: AlertController ,private _location: Location, private proyectos: ProyectosService, private activateRoute: ActivatedRoute) {
    this.cargar();
  }

  changeHoraInicio(hI, hF){
    console.log(hI);
    console.log(hF);

    if ( hF.value == "" || new Date(hI.value) >= new Date(hF.value) ) {
      let a = new Date(hI.value);

      if ( a.getHours() == 23 ) {

        a.setHours( 22 );
        hI.value = `${a}`;
        a.setHours( 23 );

      }else{
        a.setHours( a.getHours() + 1 );
      }
      
      hF.value = `${a}`;

      this.proyecto.horasTrabajar.data = {
        hI: hI.value,
        hF: hF.value
      }
    }
    this.proyectos.saveStorage();
  }

  changeHoraFinal(hF, hI){
  
    if ( hI.value == "" || new Date(hI.value) >= new Date(hF.value) ) {
      
      let a = new Date(hF.value);

      if ( a.getHours() == 0 ) {
        a.setHours( 2 );
        hF.value = `${a}`;
        a.setHours( 0 );
      }else{
        a.setHours( a.getHours() - 1 );
      }

      
      console.log(a);
      hI.value = `${a}`;

      this.proyecto.horasTrabajar.data = {
        hI: hI.value,
        hF: hF.value
      }
    }
    this.proyectos.saveStorage();
  }
  changeHorarioDiario(value){
    console.log(value);
    if ( value <= 0 ) {
      value = 1;
    }
    if ( value >= 25 ) {
      value = 24;
    }
    if ( value == null || value == undefined) {
      value = 1;
    }
    this.proyecto.horasTrabajar.data.value = value;
    this.proyectos.saveStorage(); 
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
  
    if( ev.detail.value == 'tareas' ){
      this.tareas = true;
    }else{
      this.tareas = false;
    }
  }

  cambioTipoHorario(ev: any){
    
    console.log(ev)
    // this.proyecto.horasTrabajar.tipo
    if( ev.detail.value == 'HD' ){
      this.proyecto.horasTrabajar.tipo = 'HD';
      this.proyecto.horasTrabajar.data = {
        value: 5 
      }
    }else{
      this.proyecto.horasTrabajar.tipo = 'HF';
      this.proyecto.horasTrabajar.data = {
        hI: '',
        hF: ''
      }
    }
    this.proyectos.saveStorage();
  }

  redondear(numero:number){
    return Math.round(numero);
  }

  regresar() {
    this._location.back();
  }

  cargar(){
    let id = this.activateRoute.snapshot.paramMap.get('id');
    this.proyecto = this.proyectos.proyectos.filter( proyecto => {
      return proyecto.id == Number(id);
    })[0];
    console.log(this.proyecto);
  }

  async nuevaTarea(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Tarea',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre De La Tarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Crear',
          handler: async (data) => {
            this.proyecto.tareas.push( new TareaController(data.nombre) );
            this.proyectos.saveStorage();
          }
        }
      ]
    });

    await alert.present();
  }

  cambiarCheck(tarea){
    this.proyecto.tareas.map( tareaArg => {
      if ( tareaArg.id == tarea.id ) {
        if ( tareaArg.terminada ) {
          tareaArg.terminada = true;
          tareaArg.fechaTerminada = new Date();
          tareaArg.avance = 100;
        }else{
          tareaArg.fechaTerminada = null;
          tareaArg.avance = 0;
          tareaArg.terminada = false;
        }
      }
      return tareaArg;
    });

    this.proyectos.saveStorage();
  }

  eliminarTarea( i:number ){
    this.proyecto.tareas.splice( i, 1 );
    this.proyectos.saveStorage();
  }


  abrirTarea(idProyecto:number, idTarea:number){
    this.router.navigateByUrl(`/tarea/${idProyecto}/${idTarea}`);
  }



  // funciones de proyecto tipo ayuda

  changeAyudandoA(valor){
    this.proyecto.tipo.content.ayudandoA = valor;
    this.proyectos.saveStorage();
  }

  changeDescAyuda(valor){
    this.proyecto.tipo.content.descripcionAyuda = valor;
    this.proyectos.saveStorage();
  }

  // funciones de proyecto tipo contrato

  changePrecioContrato(valor){
    console.log(valor)
    if ( valor <= 0 || valor == null || valor == undefined ) {
      valor = 1;
    }
    this.proyecto.tipo.content.precio = valor;
    
    let a = valor;
    let im = this.proyecto.tipo.content.impuestos;

    if ( im <= 0 ) {
      this.proyecto.tipo.content.precioImpuestos = a;
    }else{
      this.proyecto.tipo.content.precioImpuestos = a + ( a / im );
    }
    
    this.proyectos.saveStorage();
  }

  changeImpuestosContrato(valor){
    console.log(valor)
    if ( valor == null || valor == undefined || valor == '' || valor < 0 ) {
      valor = 0;
    }
    if ( valor >= 101 ) {
      valor = 100;
    }
    this.proyecto.tipo.content.impuestos = valor;

    let im = valor;
    let a = this.proyecto.tipo.content.precio;

    if ( im <= 0 ) {
      this.proyecto.tipo.content.precioImpuestos = a;
    }else{
      console.log(a)
      console.log(im)
      this.proyecto.tipo.content.precioImpuestos = Number(a) + Number( (a * im) / 100 );
    }
    
    this.proyectos.saveStorage();
  }

  ///////////////////////////////////////////////////////////////


  diasChange(){
    console.log( this.proyecto.diasTrabajar )
    this.proyectos.saveStorage();
  }


}
