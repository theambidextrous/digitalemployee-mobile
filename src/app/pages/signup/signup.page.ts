import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoarderService } from 'src/app/services/loarder.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public postData = {
    email:'',
    password:'',
    confirm_password:''
  }
  constructor(
    private r: Router,
    private authService : AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    public loarderService: LoarderService
  ) { }

  ngOnInit() {
  }
    // validator
    validateForm(){
      let email = this.postData.email.trim();
      let password = this.postData.password.trim();
      let confirm_password = this.postData.confirm_password.trim();
      return (
        this.postData.email &&
        this.postData.password &&
        this.postData.confirm_password &&
        email.length > 0 &&
        password.length > 0 &&
        confirm_password.length > 0 && 
        password == confirm_password
        );
      }
    // register
    register(){

      if(!this.validateForm()){
        this.toastService.showToast('Password mismatch!');
        return;
      }
      //
      this.loarderService.present();
      this.authService.signup(this.postData).subscribe((res:any) => {
        this.loarderService.dismiss();
        if(res.status == 0){
          this.r.navigate(['login']);
        }else{
          this.toastService.showToast(res.message);
        }
      },
      (err:any) =>{
        this.loarderService.dismiss();
        if(err.status === 401){
          this.toastService.showToast('Session expired. Please login');
          this.r.navigate(['join']);
        }else{
          this.toastService.showToast('Connection refused. Turn on your data');
          this.r.navigate(['join']);
        }
      });
    }
}
