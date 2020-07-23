import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthConstants } from '../config/auth-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  displaySessionData:any;
  statics_path: any;
  
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.sessionData$.subscribe((res: any) => {
      this.displaySessionData = res;
      this.statics_path = AuthConstants.IMG_PATH;
    }, (error:any) =>{
      console.log(error);
    });
  }
  endSession(){
    this.authService.logout();
  }
}
