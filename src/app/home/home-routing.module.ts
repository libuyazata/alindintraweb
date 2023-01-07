import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { HomeComponent } from './home.component';
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
      path: 'home', component: HomeComponent, 
      canActivate : [AuthenticationGuard],
      loadChildren: './home.module#HomeModule',
      //data: { title: extract('Home'), role: 'HOD' } // 
      data: { title: extract('Home') } // 
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class HomeRoutingModule { }
