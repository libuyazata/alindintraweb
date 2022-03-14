import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkViewRoutingModule } from './work-view-routing.module';
import { WorkViewComponent } from './work-view.component';
import { WorkViewService } from '@app/work-view/work-view.service';
import { DataTableModule } from 'angular-6-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DownloadReportModule } from '@app/shared/components/download-ctrl/download.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    NgbModule.forRoot(),
	FormsModule, 
    ReactiveFormsModule,
    WorkViewRoutingModule,
	NgMultiSelectDropDownModule,
	DownloadReportModule,
  ],
  declarations: [
    WorkViewComponent
  ],
  providers:[
    WorkViewService,
	AlertNotificationService,
	DownloadReportModule
  ]
})
export class WorkViewModule { }
