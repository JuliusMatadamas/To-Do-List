import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletesPage } from './completes.page';

const routes: Routes = [
  {
    path: '',
    component: CompletesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletesPageRoutingModule {}
