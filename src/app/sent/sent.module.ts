import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { SentRoutingModule } from './sent-routing.module';
import { SentComponent } from './sent.component';
import { SentService } from '@app/sent/sent.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    SentRoutingModule,
	SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
 ],
  declarations: [
    SentComponent
  ],
  providers:[
    SentService
  ]
})
export class SentModule { }
