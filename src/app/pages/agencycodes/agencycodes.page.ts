import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoarderService } from 'src/app/services/loarder.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { error } from 'protractor';

@Component({
  selector: 'app-agencycodes',
  templateUrl: './agencycodes.page.html',
  styleUrls: ['./agencycodes.page.scss'],
})
export class AgencycodesPage implements OnInit {
  public postData = {
    numberofcodes:''
  }
  displaySessionData: any;
  agent_codes: any;

  constructor(
    private r: Router,
    private authService : AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    public loarderService: LoarderService 
  ) { }

  ngOnInit() {
    this.authService.sessionData$.subscribe((res: any) => {
      this.displaySessionData = res;
    }, (error:any) =>{
      if(error.status === 401){
        this.toastService.showToast('Session expired. Please login');
        this.r.navigate(['login']);
      }else{
        this.toastService.showToast('Connection refused. Turn on your data');
        this.r.navigate(['login']);
      }
    })
    this.authService.getAgencyCodes(this.displaySessionData.token, this.displaySessionData.logged_user.public_id).subscribe((code_resp:any)=>{
      if(code_resp.payload.status == 0){
        this.agent_codes = code_resp.payload;
      }
    },
    (e:any)=>{
      if(e.status === 401){
        this.toastService.showToast('Session expired. Please login');
        this.r.navigate(['login']);
      }else{
        this.toastService.showToast('Connection refused. Turn on your data');
        this.r.navigate(['login']);
      }
    })
  }
  validateForm(){
    let numberofcodes = this.postData.numberofcodes.trim();
    return (
      this.postData.numberofcodes &&
      numberofcodes.length > 0 
      );
  }
  
  generateAction(){
    if(!this.validateForm()){
      this.toastService.showToast('missing or empty fields detected!');
      return;
    }
    this.loarderService.present();
    this.authService.sessionData$.subscribe( (resp:any) =>{
      this.authService.generateAgencyCodes(resp.token, resp.logged_user.public_id, this.postData).subscribe( (res:any) =>{
        this.loarderService.dismiss();
        // console.log(res);
        if(res.payload.status == 0){
          this.authService.getAgencyCodes(resp.token, resp.logged_user.public_id).subscribe((code_resp:any)=>{
            if(code_resp.payload.status == 0){
              this.agent_codes = code_resp.payload;
            }
          },
          (e:any)=>{
            this.loarderService.dismiss();
            if(e.status === 401){
              this.toastService.showToast('Session expired. Please login');
              this.r.navigate(['login']);
            }else{
              this.toastService.showToast('Connection refused. Turn on your data');
              this.r.navigate(['login']);
            }
          });
          this.toastService.showToast('Code(s) generated successfully!');
          this.r.navigate(['/home/agencycodes']);
        }else{
          this.toastService.showToast(res.payload.message);
          this.r.navigate(['/home/agencycodes']);
        }
      },
      (err:any) =>{
        this.loarderService.dismiss();
        if(err.status === 401){
          this.toastService.showToast('Session expired. Please login');
          this.r.navigate(['login']);
        }else{
          this.toastService.showToast('Connection refused. Turn on your data');
          this.r.navigate(['login']);
        }
      });
    },
    (error:any) => {
      this.loarderService.dismiss();
      if(error.status === 401){
        this.toastService.showToast('Session expired. Please login');
        this.r.navigate(['login']);
      }else{
        this.toastService.showToast('Connection refused. Turn on your data');
        this.r.navigate(['login']);
      }
    });
  }
}
