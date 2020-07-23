import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl : ToastController) { }
  // show toast
  async showToast(msg : string){
    const t = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color:'warning',
      cssClass: 'de-toast',
      mode: 'md',
    })
    t.present();
  }
}
