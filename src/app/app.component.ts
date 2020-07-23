import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
const { statusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  displaySessionData: any;
  statics_path: any;
  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {

    });
  }
  
}
