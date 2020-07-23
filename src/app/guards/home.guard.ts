import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor (
    private storageService: StorageService, 
    private authService: AuthService,
    private r: Router
  ){}
  canActivate(): Promise<boolean> {
    this.authService.validate();
    return new Promise( resolve => {
      this.storageService.get(AuthConstants.AUTH).then( res => {
        if(res){
          resolve(true);
        }else{
          this.r.navigate([''])
          resolve(false);
        }
      }).catch(err => {
        resolve(false);
      })
    })
  }
}
