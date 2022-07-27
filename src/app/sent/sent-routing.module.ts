import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { SentComponent } from './sent.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'sent', 
      component: SentComponent, 
      loadChildren: './sent.module#SentModule',
      data: { title: extract('Sent')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SentRoutingModule { }
