import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkStatusModule } from './work-status/work-status.module';



@NgModule({
  imports: [
    CommonModule,
	WorkStatusModule,
    TranslateModule,
    NgbModule.forRoot(),
    DataTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ],
  providers:[
  ]
})
export class GeneralInfoModule { }
