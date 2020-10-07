import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private modo;

  public toggle = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    setTimeout(() => {
      if ( localStorage.getItem('modo') ) {
        this.modo = localStorage.getItem('modo');
      }else{
        this.modo = 'normal';
      }
  
      if ( this.modo == 'dark' ) {
        // document.body.classList.toggle('dark');
        document.querySelector('#themeToggle').setAttribute('checked', 'true');
        console.log(document.querySelector('#themeToggle'))
        // this.toggle = true;
        document.body.classList.toggle('dark');
        this.modo = 'dark'
        localStorage.setItem('modo', 'dark');
      }else{
        // document.body.classList.remove('dark');
        document.querySelector('#themeToggle').setAttribute('checked', 'false');
        // this.toggle = false;
      }
    }, 1000);
  }
  

  cambiar(){
  
    if ( this.modo == 'normal' ) {
      document.body.classList.toggle('dark');
      this.modo = 'dark'
      localStorage.setItem('modo', 'dark');
    }else{
      document.body.classList.remove('dark');
      this.modo = 'normal';
      localStorage.setItem('modo', 'normal');
    }
  }
}
