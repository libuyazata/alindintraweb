import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveStatus } from '@app/shared/pipes/leave-status/leave-status.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LeaveStatus
  ],
  exports:[
    LeaveStatus
  ]
})
export class LeaveStatusFormatModule { }