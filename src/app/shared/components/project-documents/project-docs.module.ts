import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDocumentsComponent } from '@app/shared/components/project-documents/project-docs.component';
import { ProjectDocumentsService } from '@app/shared/components/project-documents/project-docs.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,   
    FormsModule, 
    ReactiveFormsModule 
  ],
  declarations: [
    ProjectDocumentsComponent
  ],
  providers: [
    ProjectDocumentsService
  ],
  exports:[
    ProjectDocumentsComponent
  ]
})
export class ProjectDocumentsModule { }
