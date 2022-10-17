import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { GeneralmessageinboxComponent } from './general-message-inbox.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'general-message-inbox', 
      component: GeneralmessageinboxComponent, 
      loadChildren: './general-message-inbox.module#GeneralmessageinboxModule',
      data: { title: extract('general-message-inbox')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GeneralmessageinboxRoutingModule { }
