import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';

import { ChangepasswordRoutingModule } from './change-password-routing.module';
import { ChangepasswordComponent } from './change-password.component';
import { ChangepasswordService } from '@app/change-password/change-password.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DataTableModule,
    ReactiveFormsModule,
    ChangepasswordRoutingModule,
	SharedModule,
  ],
  declarations: [
    ChangepasswordComponent
  ],
  providers:[
    ChangepasswordService
  ]
})
export class ChangepasswordModule { }
