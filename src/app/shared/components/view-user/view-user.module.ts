import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MyDatePickerModule } from 'mydatepicker';

import { ViewUserService } from './view-user.service';
import { ViewUserComponent } from './view-user.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    MyDatePickerModule,
  ],
  declarations: [
    ViewUserComponent
  ],
  providers: [
    ViewUserService
  ],
  exports:[
    ViewUserComponent
  ]
})
export class ViewUserModule { }
