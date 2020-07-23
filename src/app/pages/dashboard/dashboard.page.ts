import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoarderService } from 'src/app/services/loarder.service';
import { error } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  displaySessionData: any;
  constructor(private authService: AuthService, public loarderService: LoarderService) { }

  ngOnInit() {
    this.authService.sessionData$.subscribe((res: any) => {
      this.displaySessionData = res;
    }, (error:any) =>{
      console.log(error);
    })
  }

}
