import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MonthViewService } from './month-view.service';
import { MonthViewComponent } from './month-view.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    FormsModule, 
    ReactiveFormsModule 
  ],
  declarations: [
      MonthViewComponent
  ],
  providers: [
    MonthViewService
  ],
  exports:[
      MonthViewComponent
  ]
})
export class MonthViewModule { }
