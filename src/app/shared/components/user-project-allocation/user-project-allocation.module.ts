import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProjectAllocationsComponent } from './user-project-allocation.component';
import { DataTableModule } from 'angular-6-datatable';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    FormsModule, 
    DataTableModule,
    ReactiveFormsModule 
  ],
  declarations: [
    UserProjectAllocationsComponent
  ],
  providers: [
  ],
  exports:[
    UserProjectAllocationsComponent
  ]
})
export class UserProjectAllocationModule { }
