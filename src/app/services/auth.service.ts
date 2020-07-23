import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sessionData$ = new BehaviorSubject<any>('');
  constructor(
    private httpService: HttpService, 
    private storageService: StorageService, 
    private toastService: ToastService,
    private router: Router) { }
  
  // get session data
  sessionData(){
    this.validate();
    this.storageService.get(AuthConstants.AUTH).then( res =>{
      this.sessionData$.next(res);
    });
  }
  //login
  login(postData: any) : Observable<any> {
    return this.httpService.loginPost('auth', postData.username, postData.password);
  }
  // validate session
  validate(){
    this.storageService.get(AuthConstants.AUTH).then( res => {
      let xtoken = res.token;
      this.httpService.authenticatedPost('auth/validate', xtoken, xtoken).subscribe( (res: any) => {
        // console.log(res);
        if(res.payload){
          // do nothing
        }
      }, (err: any) =>{
        // console.log(err);
        if(err.status === 401){
          // console.log(err);
          this.logout();
          this.toastService.showToast('Session Expired!');
        }else{
          this.storageService.removeItem(AuthConstants.AUTH).then( res =>{
            this.sessionData$.next('');
            this.router.navigate(['']);
          })
          this.toastService.showToast('Service unavailable');
        }
      });
    });
  }
  // update profile
  updateProfile(xtoken:string, public_id: string, postData:any){
    return this.httpService.authenticatedPost('users/data/' + public_id, postData, xtoken);
  }
  // re-fetch user data
  refreshUserData(xtoken:string, public_id: string, postData:any){
    return this.httpService.authenticatedPost('userdata/refresh/' + public_id, postData, xtoken);
  }
  // generate agency codes
  generateAgencyCodes(xtoken:string, public_id: string, postData:any){
    return this.httpService.authenticatedPost('users/agencycodes/'+public_id, postData, xtoken);
  }
    // get agency codes
    getAgencyCodes(xtoken:string, public_id: string){
      return this.httpService.authenticatedGet('users/agencycodes/'+public_id, xtoken);
    }
  //signup
  signup(postData: any) : Observable<any> {
    return this.httpService.unAuthenticatedPost('users', postData)
  }
  //logout
  logout() {
    //this.storageService.clear();
    this.storageService.removeItem(AuthConstants.AUTH).then( res =>{
      this.sessionData$.next('');
      this.router.navigate(['login']);
    })
  }
}
