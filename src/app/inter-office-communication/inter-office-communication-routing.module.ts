import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { InterofficeCommunicationComponent } from './inter-office-communication.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'inter-office-communication', 
      component: InterofficeCommunicationComponent, 
      loadChildren: './inter-office-communication.module#InterofficeCommunicationModule',
      data: { title: extract('Inter Office Communication')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InterofficeCommunicationRoutingModule { }
