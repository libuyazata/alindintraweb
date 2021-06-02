import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDocumentsComponent } from '@app/shared/components/user-documents/user-docs.component';
import { UserDocumentsService } from '@app/shared/components/user-documents/user-docs.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    FormsModule, 
    ReactiveFormsModule 
  ],
  declarations: [
    UserDocumentsComponent
  ],
  providers: [
    UserDocumentsService
  ],
  exports:[
    UserDocumentsComponent
  ]
})
export class UserDocumentsModule { }
