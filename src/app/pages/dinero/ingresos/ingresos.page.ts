import { Component } from '@angular/core';
import { DineroService } from 'src/app/services/dinero/dinero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
})
export class IngresosPage {

  reportes:boolean = false;

  
  constructor(private _location: Location, public dinero: DineroService ) { 

  }

  regresar() {
    this._location.back();
  }

  segmentChanged(ev){
    if( ev.detail.value == 'reportes' ){
      this.reportes = true;
    }else{
      this.reportes = false;
    }
    
  }

}
