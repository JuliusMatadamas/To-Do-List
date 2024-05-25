import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletesPageRoutingModule } from './completes-routing.module';

import { CompletesPage } from './completes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletesPageRoutingModule
  ],
  declarations: [CompletesPage]
})
export class CompletesPageModule {}
