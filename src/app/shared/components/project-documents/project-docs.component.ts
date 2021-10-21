import { Component, Input, OnInit, EventEmitter, Output, OnChanges, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { BaseComponent } from '@app/core/component/base.component';
import { ProjectDocumentsService } from '@app/shared/components/project-documents/project-docs.service';
import { Subject } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'project-docs',
  templateUrl: './project-docs.component.html',
  styleUrls: ['./project-docs.component.scss']
})
export class ProjectDocumentsComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() projectId: number;
  @Output() employeeDocumentsClicked = new EventEmitter();

  public uploadPerCent : string;
  public documentList: Array<any>;
  public projectDocumentUploadsForm : FormGroup;
  public serverBasePath = environment.basePath;

  constructor(private projectDocService:ProjectDocumentsService) {
    super(projectDocService);
  }

  ngOnInit() {
    this.projectDocumentUploadsForm = new FormGroup({
      "remarks" : new FormControl(''),
      "document" : new FormControl(''),
    });
    console.log("ng init called for Project Documents");
  }

  ngOnChanges(){
    this.getProjectDocuments(this.projectId);
    console.log("On Changes");
  }

  ngAfterViewInit(){    
    console.log("After view init");
  }

  public upload(files: File[]){
    if(this.projectDocumentUploadsForm.get("remarks").value != "" &&
       this.projectDocumentUploadsForm.get("remarks").value != null) {
      var formData = new FormData();
      Array.from(files).forEach(f => formData.append('file', f, f.name));
      formData.append("projectId", this.projectId.toString());
      formData.append("remarks", this.projectDocumentUploadsForm.get("remarks").value);
      this.projectDocService.uploadDocument(formData).subscribe((event:any) => {
        if (event && event.type === HttpEventType.UploadProgress) {
          let percentDone = Math.round(100 * event.loaded / event.total);
          this.uploadPerCent = percentDone.toString();
          console.log("Percentage Done " + percentDone);
        } else if (event && event instanceof HttpResponse) {
          let uploadSuccess = true;
          this.uploadPerCent = '0';
          this.projectDocumentUploadsForm.reset();
          console.log("Upload Success " + uploadSuccess);
          this.getProjectDocuments(this.projectId);
        }
      });
    } else {      
      this.projectDocumentUploadsForm.reset();
      this.showAlert("Please enter the remarks.");
    }
  }

  public deleteDocument(documentId:number, userId:number){
    if(confirm("Are you sure to delete this document?. Click 'Ok' to delete the document else 'Cancel'.")){
      let docInfo = { "projectDocumentId" : documentId  };
      this.projectDocService.deleteProjectDocumentById(docInfo).subscribe((resp:any)=>{
        if(resp.status == "success"){
          this.getProjectDocuments(this.projectId);
        }
      });
    }
  }

  public isImage(fileName:string){
    return fileName.match(/.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/i);
  }

  protected initialize() {
    this.projectDocumentUploadsForm = new FormGroup({
      remarks : new FormControl(''), 
      document : new FormControl(''),
    });
  }
  
  protected getProjectDocuments(projectId:number){
    if(projectId > 0){
      this.projectDocService.getProjectDocuments(projectId).subscribe((resp:any) => {
        this.documentList = resp.projectDocuments;
      });
    } else {
      this.documentList = [];
    }
  }  
}
