import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DeputationComponent } from './deputation.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'deputation', 
      component: DeputationComponent, 
      loadChildren: './deputation.module#DeputationModule',
      data: { title: extract('Deputation') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DeputationRoutingModule { }
