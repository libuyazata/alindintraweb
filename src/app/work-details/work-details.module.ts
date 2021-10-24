import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkDetailsRoutingModule } from './work-details-routing.module';
import { WorkDetailsComponent } from './work-details.component';
import { WorkDetailsService } from '@app/work-details/work-details.service';
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
    WorkDetailsRoutingModule,
	NgMultiSelectDropDownModule,
	DownloadReportModule,
  ],
  declarations: [
    WorkDetailsComponent
  ],
  providers:[
    WorkDetailsService,
	AlertNotificationService,
	DownloadReportModule
  ]
})
export class WorkDetailsModule { }
