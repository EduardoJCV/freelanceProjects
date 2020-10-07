import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { Location } from '@angular/common';
// import { SubTareaController } from 'src/app/controllers/sub-tarea.controller';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
})
export class TareaPage {

  proyecto;

  tarea;

  constructor( private alert:AlertController, private activateRoute: ActivatedRoute, private proyectos: ProyectosService, private _location: Location) { 
    this.cargar();
  }

  regresar() {
    this._location.back();
  }

  cargar(){
    let a = this.activateRoute.snapshot
    let idProy = this.activateRoute.snapshot.paramMap.get('idProy');
    let idTar = this.activateRoute.snapshot.paramMap.get('idTar');

    this.proyecto = this.proyectos.proyectos.filter( proyecto => {
      return proyecto.id == Number(idProy);
    })[0];

    this.tarea = this.proyecto.tareas.filter( tarea => {
      return tarea.id == Number(idTar);
    })[0];

    console.log(this.proyecto);
    console.log(this.tarea);
  }


  cambiaRange(item){
    this.tarea.avance = item.value;
    if (item.value == 100) {
      this.tarea.terminada = true;
    }

    this.proyectos.saveStorage();
  }
  cambiarFechaLimite(fecha){
    this.tarea.fechaLimite = fecha.value;
    this.proyectos.saveStorage();
  }
  cambiarDescripcion(desc){
    this.tarea.descripcion = desc.value;
    this.proyectos.saveStorage();
  }

  cambiarCheckSubtarea( id:number ){
    console.log(id);
    console.log(this.tarea.subTareas[id])
    if ( this.tarea.subTareas[id].terminada ) {
      this.tarea.subTareas[id].terminada = true;
    }else{
      this.tarea.subTareas[id].terminada = false;
    }
    
    this.proyectos.saveStorage();

  }





  async nuevaSubTarea(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Subtarea',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre De La Subtarea'
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
            this.tarea.subTareas.push( {
              nombre: data.nombre,
              terminada: false
            } );
            this.proyectos.saveStorage();
          }
        }
      ]
    });
    await alert.present();
  }

}
