import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';

import { CreateUserService } from './create-user.service';
import { CreateUserComponent } from './create-user.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    FormsModule, 
    MyDatePickerModule,
    ReactiveFormsModule 
  ],
  declarations: [
    CreateUserComponent
  ],
  providers: [
    CreateUserService
  ],
  exports:[
    CreateUserComponent
  ]
})
export class CreateUserModule { }
