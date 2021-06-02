import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertSizeInBytes } from '@app/shared/pipes/convert-bytes/convert-bytes.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConvertSizeInBytes
  ],
  exports:[
    ConvertSizeInBytes
  ]
})
export class ConvertSizeInBytesPipeModule { }