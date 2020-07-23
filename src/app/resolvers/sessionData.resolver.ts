import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionDataResolver {

    constructor(
        private authService: AuthService
    ){}
    resolve(){
        // console.log('Home pa¿ges traffic');
        return this.authService.sessionData()
    }
}