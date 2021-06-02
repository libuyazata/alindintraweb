import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFilterPipe } from '@app/shared/pipes/data-filter/data-filter.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      DataFilterPipe
  ],
  exports:[
    DataFilterPipe
  ]
})
export class DataFilterPipeModule { }