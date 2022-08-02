import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { WorkHomeComponent } from './work-home.component';
import { AuthenticationGuard } from './../core/authentication/authentication.guard';

const routes: Routes = [
  Route.withShell([
    // {
    //    path: '', redirectTo: '/home', pathMatch: 'full' ,
    //    canActivate : [AuthenticationGuard],
    //    loadChildren: './home.module#HomeModule',
    //    data: { title: extract('Home'), role: 'Admin' } 
    // },
    { 
      path: 'work-home', component: WorkHomeComponent, 
      canActivate : [AuthenticationGuard],
      loadChildren: './work-home.module#WorkHomeModule',
      data: { title: extract('Work Home') } // 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class WorkHomeRoutingModule { }
