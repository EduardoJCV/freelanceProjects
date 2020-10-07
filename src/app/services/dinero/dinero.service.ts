import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DineroService {

  fechaActual:Date = new Date();
  mesActual:string;

  ingresoTotal:number = 0.00;
  gastoTotal:number = 0.00;
  ahorroTotal:number = 0.00;

  gastos:any[] = [];
  ingresos:any[] = [];

  constructor( public actionSheetController: ActionSheetController, public alertController: AlertController ) { 
    this.mesActual = `${(this.fechaActual.getMonth() +1)}/${this.fechaActual.getFullYear()}`;
    if ( localStorage.getItem('gastos') ) {
      this.gastos = JSON.parse( localStorage.getItem('gastos') );
    }
    if ( localStorage.getItem('ingresos') ) {
      this.ingresos = JSON.parse( localStorage.getItem('ingresos') );
    }

    for (let i = 0; i < this.gastos.length; i++) {
      if ( this.gastos[i].tipo.tipo == 'fijo' ) {
        this.gastoTotal += this.gastos[i].valor;
      } else {
        if ( this.gastos[i].tipo.tipo == 'extra' && this.gastos[i].tipo.mes == this.mesActual ) {
          this.gastoTotal += this.gastos[i].valor;
        } else {
          this.gastos = this.gastos.filter( res =>{
            return res.id !== this.gastos[i].id;
          });
          this.saveStorage();
        }
      }
    }
    for (let i = 0; i < this.ingresos.length; i++) {
      if ( this.ingresos[i].tipo.tipo == 'fijo' ) {
        this.ingresoTotal += this.ingresos[i].valor;
      } else {
        if ( this.ingresos[i].tipo.tipo == 'extra' && this.ingresos[i].tipo.mes == this.mesActual ) {
          this.ingresoTotal += this.ingresos[i].valor;
        } else {
          this.ingresos = this.ingresos.filter( res =>{
            return res.id !== this.ingresos[i].id;
          });
          this.saveStorage();
        }
      }
    }

    this.ahorroTotal = ( this.ingresoTotal - this.gastoTotal );
    
  }

  saveStorage(){
    localStorage.setItem('gastos', JSON.stringify( this.gastos ) );
    localStorage.setItem('ingresos', JSON.stringify( this.ingresos ) );
    this.ahorroTotal = ( this.ingresoTotal - this.gastoTotal );
  }


  //////////////////////////crear

  async nuevoGasto(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Nuevo Gasto',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Gasto Fijo',
          icon: 'bulb',
          handler: () => {
            this.nuevoGastoFijo();
          }
        },
        {
          text: 'Gasto Extra',
          icon: 'beer',
          handler: () => {
            this.nuevoGastoExtra();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  ////////////////
  async nuevoGastoFijo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gasto Fijo',
      inputs: [
        { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { label: 'Valor', name: 'valor', type: 'number', min: 0, max: 100000 },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            data.valor = Number(data.valor);
            console.log(data);
            if (data.nombre == '') {
              data.nombre = 'Sin nombre'
            }
            if ( data.valor >= 100000 || data.valor <= 0 ) {
              data.valor = 1;
            }
            this.gastoTotal+=data.valor;
            this.gastos.push({
              id: new Date().getTime(),
              nombre: data.nombre,
              valor: data.valor,
              tipo: {
                tipo: 'fijo',
              }
            })
            this.saveStorage();
          }
        }
      ]
    });
    await alert.present();
  }

  async nuevoGastoExtra() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gasto Extra',
      inputs: [
        { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { label: 'Valor', name: 'valor', type: 'number', min: 0, max: 100000 },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            data.valor = Number(data.valor);
            console.log(data);
            if (data.nombre == '') {
              data.nombre = 'Sin nombre'
            }
            if ( data.valor >= 100000 || data.valor <= 0 ) {
              data.valor = 1;
            }
            let a = new Date();
            this.gastoTotal+=data.valor;
            this.gastos.push({
              id: new Date().getTime(),
              nombre: data.nombre,
              valor: data.valor,
              tipo: {
                tipo: 'extra',
                mes: this.mesActual
              }
            })
            this.saveStorage();
          }
        }
      ]
    });
    await alert.present();
  }
///////////////////////////////////////////
  async editarGasto( gasto ){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Gasto Fijo',
      inputs: [
        { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre', value: gasto.nombre },
        { label: 'Valor', name: 'valor', type: 'number', min: 0, max: 100000, value: gasto.valor },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            data.valor = Number(data.valor);
            console.log(data);
            if (data.nombre == '') {
              data.nombre = 'Sin nombre'
            }
            if ( data.valor >= 100000 || data.valor <= 0 ) {
              data.valor = 1;
            }

            this.gastos.map( gastoData =>{
              if ( gastoData.id == gasto.id ) {
                gastoData.nombre = data.nombre;
                gastoData.valor = data.valor;
              }
              return gastoData;
            });

            this.saveStorage();
          }
        }
      ]
    });
    await alert.present();
  }
  /////////////////////////////////////////functiones de eliminacion
  async eliminarGasto( gasto ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Gasto',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {

            this.gastos = this.gastos.filter( res =>{
              return res.id !== gasto.id;
            });
        
            this.saveStorage();

          }
        }
      ]
    });
    await alert.present();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

async nuevoIngreso(){
  const actionSheet = await this.actionSheetController.create({
    header: 'Nuevo Ingreso',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Ingreso Fijo',
        icon: 'business',
        handler: () => {
          this.nuevoIngresoFijo();
        }
      },
      {
        text: 'Ingreso Extra',
        icon: 'cash',
        handler: () => {
          this.nuevoIngresoExtra();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  await actionSheet.present();
}
////////////////
async nuevoIngresoFijo() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Ingreso Fijo',
    inputs: [
      { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre' },
      { label: 'Valor', name: 'valor', type: 'number', min: 0, max: 100000 },
    ],
    buttons: [
      { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: (data) => {
          data.valor = Number(data.valor);
          console.log(data);
          if (data.nombre == '') {
            data.nombre = 'Sin nombre'
          }
          if ( data.valor >= 100000 || data.valor <= 0 ) {
            data.valor = 1;
          }
          this.ingresoTotal+=data.valor;
          this.ingresos.push({
            id: new Date().getTime(),
            nombre: data.nombre,
            valor: data.valor,
            tipo: {
              tipo: 'fijo',
            }
          })
          this.saveStorage();
        }
      }
    ]
  });
  await alert.present();
}

async nuevoIngresoExtra() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Ingreso Extra',
    inputs: [
      { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre' },
      { label: 'Valor', name: 'valor', type: 'number', min: 0, max: 100000 },
    ],
    buttons: [
      { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: (data) => {
          data.valor = Number(data.valor);
          console.log(data);
          if (data.nombre == '') {
            data.nombre = 'Sin nombre'
          }
          if ( data.valor >= 100000 || data.valor <= 0 ) {
            data.valor = 1;
          }
          let a = new Date();
          this.ingresoTotal+=data.valor;
          this.ingresos.push({
            id: new Date().getTime(),
            nombre: data.nombre,
            valor: data.valor,
            tipo: {
              tipo: 'extra',
              mes: this.mesActual
            }
          })
          this.saveStorage();
        }
      }
    ]
  });
  await alert.present();
}
///////////////////////////////////////////
async editarIngreso( ingreso ){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Editar Ingreso',
    inputs: [
      { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre', value: ingreso.nombre },
      { label: 'Valor', name: 'valor', type: 'number', min: 0, max: 100000, value: ingreso.valor },
    ],
    buttons: [
      { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: (data) => {
          data.valor = Number(data.valor);
          console.log(data);
          if (data.nombre == '') {
            data.nombre = 'Sin nombre'
          }
          if ( data.valor >= 100000 || data.valor <= 0 ) {
            data.valor = 1;
          }

          this.ingresos.map( ingresoData =>{
            if ( ingresoData.id == ingreso.id ) {
              ingresoData.nombre = data.nombre;
              ingresoData.valor = data.valor;
            }
            return ingresoData;
          });

          this.saveStorage();
        }
      }
    ]
  });
  await alert.present();
}
/////////////////////////////////////////functiones de eliminacion
async eliminarIngreso( ingreso ) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Eliminar Ingreso',
    buttons: [
      { text: 'Cancel', role: 'cancel', cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Aceptar',
        handler: (data) => {

          this.ingresos = this.gastos.filter( res =>{
            return res.id !== ingreso.id;
          });
      
          this.saveStorage();

        }
      }
    ]
  });
  await alert.present();
}

}
