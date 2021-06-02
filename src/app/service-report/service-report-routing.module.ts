import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ServiceReportComponent } from './service-report.component';

const routes: Routes = [
  Route.withShell([
    { 
      path: 'service-report', 
      component: ServiceReportComponent, 
      loadChildren: './service-report.module#ServiceReportModule',
      data: { title: extract('department') } 
    }
  ])  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ServiceReportRoutingModule { }
