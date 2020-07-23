import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoarderService {

  constructor(public loarderCtl: LoadingController) { }

  async present() {
    await this.loarderCtl.create({
      message: 'Please wait... Loarding',
      showBackdrop: true,
      spinner: 'bubbles',
      id: 'de'
    }).then(a => {
      a.present();
    });
  }
  async dismiss() {
    let topLoader = await this.loarderCtl.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        return;
      }
      topLoader = await this.loarderCtl.getTop();
    }
    // while (await this.loarderCtl.getTop() !== undefined) {
    //   await this.loarderCtl.dismiss();
    // }
  }
}
