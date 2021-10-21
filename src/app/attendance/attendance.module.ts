import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { AttendanceComponent } from './attendance.component';
import { MonthViewModule } from '@app/shared/components/month-view/month-view.module';
import { AttendanceRoutingModule } from '@app/attendance/attendance-routing.module';
import { AttendanceService } from '@app/attendance/attendance.service';
import { DirectivesModule } from '@app/shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    AttendanceRoutingModule,
    MonthViewModule,
    MyDatePickerModule,
    DirectivesModule
  ],
  declarations: [
    AttendanceComponent,
  ],
  providers: [
    AttendanceService
  ]
})
export class AttendanceModule { }
