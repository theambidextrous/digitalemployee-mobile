import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { ToastService } from 'src/app/services/toast.service';
import { LoarderService } from 'src/app/services/loarder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public postData = {
    username:'',
    password:''
  }
  constructor(
    private r: Router,
    private authService : AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    public loarderService: LoarderService
    ) { }

  ngOnInit() {}
  // validator
  validateForm(){
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0 
      );
  }
  // login action
  loginAction(){
    if(!this.validateForm()){
      this.toastService.showToast('missing or empty fields detected!');
      return;
    }
    this.loarderService.present();
    this.authService.login(this.postData).subscribe((res: any) => {
      if(res.payload){
        this.storageService.store(AuthConstants.AUTH, res.payload);
        if(res.payload.logged_user.has_profile == false){
          this.r.navigate(['home/userinfo']);
        }else{
          this.r.navigate(['home']);
        }
      }else{
        this.toastService.showToast('Wrong username/password');
      }
      this.loarderService.dismiss();
    },
    (error : any) => {
      this.loarderService.dismiss();
      if(error.status === 401){
        this.toastService.showToast('Invalid username/Password');
      }else{
        this.toastService.showToast('Connection refused. Turn on your data');
      }
    });

  }
}
