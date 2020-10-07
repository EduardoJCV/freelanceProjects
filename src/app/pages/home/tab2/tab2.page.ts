import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonReorderGroup } from '@ionic/angular';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;


  constructor( public proyectos: ProyectosService, private alert: AlertController, private router: Router ) {
    console.log(this.proyectos.proyectos);

    this.proyectos.actualizarProyectos();
  }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    let p1 = ev.detail.from;
    let p2 =  ev.detail.to;
    if ( p2 == 0 ) {
      let proyTemporal = this.proyectos.proyectos[p1];
      this.proyectos.proyectos.splice(p1, 1);
      this.proyectos.proyectos.unshift( proyTemporal );
      
    }else if( p2 == this.proyectos.proyectos.length ){
      let proyTemporal = this.proyectos.proyectos[p1];
      this.proyectos.proyectos.splice(p1, 1);
      this.proyectos.proyectos.push( proyTemporal );
      
    }else{
      let proyTemporal = this.proyectos.proyectos[p1];

      this.proyectos.proyectos.splice(p1, 1);

      this.proyectos.proyectos.splice( p2, 0, proyTemporal);
      
    }
    

    ev.detail.complete();
    
    this.proyectos.saveStorage();

    console.log(this.proyectos.proyectos)
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  redondear(numero:number){
    return Math.round(numero);
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo Proyecto',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre Del Proyecto'
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
          text: 'Siguiente',
          handler: async (data) => {

            const alert2 = await this.alert.create({
              cssClass: 'my-custom-class',
              header: 'Tipo De Proyecto',
              inputs: [
                {
                  name: 'radio',
                  type: 'radio',
                  label: 'Personal',
                  value: 'personal',
                  checked: true
                },
                {
                  name: 'radio',
                  type: 'radio',
                  label: 'Contrato',
                  value: 'contrato'
                },
                {
                  name: 'radio',
                  type: 'radio',
                  label: 'Ayuda',
                  value: 'ayuda'
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
                  handler: (tipo) => {
                    this.proyectos.crearProyecto( data.nombre, tipo );
                    console.log(data);
                    console.log(tipo);
                  }
                }
              ]
            });
            await alert2.present();
          }
        }
      ]
    });

    await alert.present();
  }

  obtenerFecha( fecha:string ){
    if (fecha == null) {
      return "";
    }
    let f = new Date(fecha);
    return `${f.getDate()}/${(f.getMonth() +1)}/${f.getFullYear()}`;
  }

  abrirProyecto(id:number){
    this.router.navigateByUrl(`/proyecto/${id}`);
  }


}
