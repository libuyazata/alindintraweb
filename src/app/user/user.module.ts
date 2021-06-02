import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyDatePickerModule } from 'mydatepicker';
import {DataTableModule} from "angular-6-datatable";

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DataFilterPipeModule } from '@app/shared/pipes/data-filter/data-filter-pipe.module';
import { UserService } from '@app/user/user.service';
import { LeaveStatusFormatModule } from '@app/shared/pipes/leave-status/leave-status-pipe.module';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    //CoreModule,
    SharedModule,
    UserRoutingModule,
    NgbModule.forRoot(),
    MyDatePickerModule,
    DataTableModule,
    DataFilterPipeModule,
    LeaveStatusFormatModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserComponent
  ],
  providers: [
   UserService
  ]
})
export class UserModule { }
