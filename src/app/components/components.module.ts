import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { LogoComponent } from './logo/logo.component';
import { StartComponent } from './start/start.component';
import { FooterComponent } from './footer/footer.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';



@NgModule({
  declarations: [SlidesComponent, LogoComponent,StartComponent, FooterComponent, MainmenuComponent],
  exports: [SlidesComponent, LogoComponent,StartComponent,FooterComponent, MainmenuComponent],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule
  ]
})
export class ComponentsModule { }
