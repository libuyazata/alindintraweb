import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorkpresentRoutingModule } from '@app/work-present/work-present-routing.module';
import { WorkpresentComponent } from '@app/work-present/work-present.component';
import { WorkpresentService } from '@app/work-present/work-present.service';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
	FormsModule, 
    ReactiveFormsModule,
	NgxPaginationModule,
    WorkpresentRoutingModule
  ],
  declarations: [
    WorkpresentComponent
  ],
  providers:[
    WorkpresentService,
	AlertNotificationService
  ]
})
export class WorkpresentModule { }
