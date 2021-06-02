import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorkDetailsRoutingModule } from './work-details-routing.module';
import { WorkDetailsComponent } from './work-details.component';
import { WorkDetailsService } from '@app/work-details/work-details.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    WorkDetailsRoutingModule
  ],
  declarations: [
    WorkDetailsComponent
  ],
  providers:[
    WorkDetailsService
  ]
})
export class WorkDetailsModule { }
