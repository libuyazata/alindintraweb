import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { DepartmentService } from '@app/department/department.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
	SharedModule,
  ],
  declarations: [
    DepartmentComponent
  ],
  providers:[
    DepartmentService
  ]
})
export class DepartmentModule { }
