import { Component, OnInit } from '@angular/core';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoarderService } from 'src/app/services/loarder.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

  public postData = {
    fname:'',
    mname:'',
    sname:'',
    phone:'',
    national_id:'',
    next_of_kin_name:'',
    next_of_kin_email:''
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
    let fname = this.postData.fname.trim();
    let mname = this.postData.mname.trim();
    let sname = this.postData.sname.trim();
    let phone = this.postData.phone.trim();
    let national_id = this.postData.national_id.trim();
    let next_of_kin_name = this.postData.next_of_kin_name.trim();
    let next_of_kin_email = this.postData.next_of_kin_email.trim();
    return (
      this.postData.fname &&
      this.postData.mname &&
      this.postData.sname &&
      this.postData.phone &&
      this.postData.national_id &&
      this.postData.next_of_kin_name &&
      this.postData.next_of_kin_email &&
      fname.length > 0 &&
      mname.length > 0 &&
      sname.length > 0 &&
      phone.length > 0 &&
      national_id.length > 0 &&
      next_of_kin_name.length > 0 &&
      next_of_kin_email.length > 0 
      );
  }
  // login action
  userinfoAction(){
    // validate form
    if(!this.validateForm()){
      this.toastService.showToast('missing or empty fields detected!');
      return;
    }
    //proceed 
    this.loarderService.present();
    this.authService.sessionData$.subscribe((sess:any)=>{
      // console.log(sess.logged_user);
      this.authService.updateProfile(sess.token, sess.logged_user.public_id, this.postData).subscribe((res: any) => {
        if(res.status == 0){
          this.authService.refreshUserData(sess.token, sess.logged_user.public_id, []).subscribe((res:any) => {
            this.loarderService.dismiss();
            if(res.payload){
              this.storageService.store(AuthConstants.AUTH, res.payload);
              this.loarderService.dismiss();
              this.toastService.showToast('Updated Successfully!');
              this.r.navigate(['home']);
            }else{
              this.toastService.showToast(res.message);
            }
          },
          (err:any) => {
            this.loarderService.dismiss();
            if(err.status === 401){
              this.toastService.showToast('Session expired. Please login');
              this.r.navigate(['login']);
            }else{
              this.toastService.showToast('Connection refused. Turn on your data');
              this.r.navigate(['login']);
            }
          })
        }else{
          this.loarderService.dismiss();
          this.toastService.showToast(res.message);
        }
      },
      (error : any) => {
        this.loarderService.dismiss();
        if(error.status === 401){
          this.toastService.showToast('Session expired. Please login');
          this.r.navigate(['login']);
        }else{
          this.toastService.showToast('Connection refused. Turn on your data');
          this.r.navigate(['login']);
        }
      }
      )
    });

  }

}
