import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate{
  constructor (
    private storageService: StorageService, 
    private r: Router
  ){}
  canActivate(): Promise<boolean> {
    return new Promise( resolve => {
      this.storageService.get(AuthConstants.AUTH).then( res => {
        if(res){
          // console.log(res);
          if(res.logged_user.has_profile == false){
            this.r.navigate(['home/userinfo']);
          }else{
            this.r.navigate(['home']);
          }
          resolve(false);
        }else{
          resolve(true);
        }
      }).catch(err => {
        resolve(false);
      })
    })
  }
}
