import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { GeneralmessagesentComponent } from './general-message-sent.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'general-message-sent', 
      component: GeneralmessagesentComponent, 
      loadChildren: './general-message-sent.module#GeneralmessagesentModule',
      data: { title: extract('general-message-sent')} 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GeneralmessagesentRoutingModule { }
