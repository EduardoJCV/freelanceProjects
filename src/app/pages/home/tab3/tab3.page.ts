import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { DineroService } from 'src/app/services/dinero/dinero.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public actionSheetController: ActionSheetController, private router: Router, public dinero: DineroService) {}

  goIngresos(){
    this.router.navigateByUrl('/ingresos');
  }
  goGastos(){
    this.router.navigateByUrl('/gastos');
  }

}

