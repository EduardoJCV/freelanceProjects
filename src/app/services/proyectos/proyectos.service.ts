import { Injectable } from '@angular/core';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectoController } from '../../controllers/proyecto.controller';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  proyectos: ProyectoModel[] = [];

  constructor() { 
    if ( localStorage.getItem('proyectos') ) {
      this.proyectos = JSON.parse( localStorage.getItem('proyectos') );
    }
  }

  crearProyecto(nombre:string, tipo:string){
    this.proyectos.push( new ProyectoController( nombre, tipo ) );

    console.log( this.proyectos );
    this.saveStorage();
  }
  

  saveStorage(){
    localStorage.setItem('proyectos', JSON.stringify( this.proyectos ) );
  }

  actualizarProyectos(){
    for (let i = 0; i < this.proyectos.length; i++) {
      let totalTareas = this.proyectos[i].tareas.length;
      let totalTareasTerminadas = 0;
      for (let i2 = 0; i2 < this.proyectos[i].tareas.length; i2++) {
        let totalSubTareas = this.proyectos[i].tareas[i2].subTareas.length;
        let totalsubTareasTerminadas = 0;

        for (let i3 = 0; i3 < this.proyectos[i].tareas[i2].subTareas.length; i3++) {
          if ( this.proyectos[i].tareas[i2].subTareas[i3].terminada == true ) {
            totalsubTareasTerminadas += 1;
          }
        }
        if ( this.proyectos[i].tareas[i2].subTareas.length > 0 ) {
          this.proyectos[i].tareas[i2].avance = (totalsubTareasTerminadas / totalSubTareas) * 100;
        }else{

        }
        if ( this.proyectos[i].tareas[i2].avance == 100 ) {
          this.proyectos[i].tareas[i2].terminada = true;
          
        }
        totalTareasTerminadas += this.proyectos[i].tareas[i2].avance;
        console.log(this.proyectos[i].tareas[i2].avance)
      }
      if ( this.proyectos[i].tareas.length > 0 ) {
        this.proyectos[i].avance = ( totalTareasTerminadas / totalTareas );
      }
    }
  }

}
