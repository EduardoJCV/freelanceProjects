import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class TiempoService {

  instance;

  actividades = [
    {
      fecha: new Date(),
      nombre: 'dormir',
      tipo: 'actividad',
      icono: 'beer',
      dias: [
        { val: 'Domingo', isChecked: true },
        { val: 'Lunes', isChecked: true },
        { val: 'Martes', isChecked: true },
        { val: 'Miercoles', isChecked: true },
        { val: 'Jueves', isChecked: true },
        { val: 'Viernes', isChecked: true },
        { val: 'Sabado', isChecked: true }
      ],
      horario: {
        tipo: 'horasDiarias',
        content: {
          valor: 5
        }
      },
      fechaFinal: null
    },
    {
      fecha: new Date(),
      nombre: 'trabajar',
      tipo: 'proyecto',
      icono: 'briefcase',
      dias: [
        { val: 'Domingo', isChecked: false },
        { val: 'Lunes', isChecked: true },
        { val: 'Martes', isChecked: true },
        { val: 'Miercoles', isChecked: true },
        { val: 'Jueves', isChecked: true },
        { val: 'Viernes', isChecked: true },
        { val: 'Sabado', isChecked: false }
      ],
      horario: {
        tipo: 'horarioFijo',
        content: {
          hI: '09:00',
          hF: '15:00'
        }
      },
      fechaFinal: '4-8-2020'
    },
    {
      fecha: new Date(),
      nombre: 'trabajar 2',
      tipo: 'proyecto',
      icono: 'briefcase',
      dias: [
        { val: 'Domingo', isChecked: false },
        { val: 'Lunes', isChecked: true },
        { val: 'Martes', isChecked: true },
        { val: 'Miercoles', isChecked: true },
        { val: 'Jueves', isChecked: true },
        { val: 'Viernes', isChecked: true },
        { val: 'Sabado', isChecked: false }
      ],
      horario: {
        tipo: 'horarioFijo',
        content: {
          hI: '09:00',
          hF: '20:00'
        }
      },
      fechaFinal: '4-8-2020'
    },
    {
      fecha: new Date(),
      nombre: 'trabajar 2',
      tipo: 'proyecto',
      icono: 'briefcase',
      dias: [
        { val: 'Domingo', isChecked: false },
        { val: 'Lunes', isChecked: true },
        { val: 'Martes', isChecked: true },
        { val: 'Miercoles', isChecked: true },
        { val: 'Jueves', isChecked: true },
        { val: 'Viernes', isChecked: true },
        { val: 'Sabado', isChecked: false }
      ],
      horario: {
        tipo: 'horarioFijo',
        content: {
          hI: '03:00',
          hF: '08:00'
        }
      },
      fechaFinal: '4-8-2020'
    }
  ];

  constructor( public actionSheetController: ActionSheetController, public alertController: AlertController ) { 
    if ( localStorage.getItem('actividades') ) {
      this.actividades = JSON.parse( localStorage.getItem('actividades') );
    }


    setTimeout(() => {

      var cal = document.querySelector('#calendar');
      var elem = document.querySelector('.datepicker');
      // var instances =  M.Datepicker.init(elem, {
      //   selectMonths: true, 
      //   selectYears: 15, 
      //   i18n: {
      //     months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      //     monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
      //     weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      //     weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      //     weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
      //   },
      //   today: 'Today',
      //   clear: 'Clear',
      //   onDraw: (e)=>{
      //     for (let i = 0; i < 11; i++) {
      //       try {
      //         document.querySelector(`button[data-day='10'][data-month='${i}'][data-year='2020']`).innerHTML+=`<ion-badge color="secondary">2</ion-badge>`
      //       } catch (error) {
      //       }
      //     }
      //   },
      //   close: 'Ok',
      //   closeOnSelect: false, 
      //   container: cal
      // });
      // this.instance = M.Datepicker.getInstance(elem);
      // this.instance.open();

    }, 1000);
  }

  saveStorage(){
    localStorage.setItem('actividades', JSON.stringify(this.actividades))
  }


}
