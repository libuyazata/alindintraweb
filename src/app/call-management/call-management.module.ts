import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CallManagementRoutingModule } from './call-management-routing.module';
import { CallManagementComponent } from './call-management.component';
import { CallManagementService } from '@app/call-management/call-management.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    CallManagementRoutingModule
  ],
  declarations: [
    CallManagementComponent
  ],
  providers:[
    CallManagementService
  ]
})
export class CallManagementModule { }
