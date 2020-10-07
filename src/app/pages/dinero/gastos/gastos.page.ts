import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DineroService } from 'src/app/services/dinero/dinero.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage {

  reportes:boolean = false;

  
  constructor(private _location: Location, public dinero: DineroService) { 

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
