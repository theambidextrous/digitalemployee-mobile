import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgencycodesPageRoutingModule } from './agencycodes-routing.module';

import { AgencycodesPage } from './agencycodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgencycodesPageRoutingModule
  ],
  declarations: [AgencycodesPage]
})
export class AgencycodesPageModule {}
