import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorkissuedRoutingModule } from '@app/work-issued/work-issued-routing.module';
import { WorkissuedComponent } from '@app/work-issued/work-issued.component';
import { WorkissuedService } from '@app/work-issued/work-issued.service';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
	FormsModule, 
    ReactiveFormsModule,
    WorkissuedRoutingModule
  ],
  declarations: [
    WorkissuedComponent
  ],
  providers:[
    WorkissuedService,
	AlertNotificationService
  ]
})
export class WorkissuedModule { }
