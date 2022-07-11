import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadProfilepicComponent } from '@app/shared/components/upload-profile-pic/upload-profile-pic.component';
import { UploadProfilepicService } from '@app/shared/components/upload-profile-pic/upload-profile-pic.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    FormsModule, 
    ReactiveFormsModule 
  ],
  declarations: [
    UploadProfilepicComponent
  ],
  providers: [
    UploadProfilepicService
  ],
  exports:[
    UploadProfilepicComponent
  ]
})
export class UploadProfilepicModule { }
