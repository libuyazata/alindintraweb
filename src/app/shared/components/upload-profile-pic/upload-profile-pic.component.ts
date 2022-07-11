import { Component, Input, OnInit, EventEmitter, Output, OnChanges, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { BaseComponent } from '@app/core/component/base.component';
import { UploadProfilepicService } from '@app/shared/components/upload-profile-pic/upload-profile-pic.service';
import { Subject } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.scss']
})
export class UploadProfilepicComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() employeeDocumentsInfo: any;
  @Input() receiveEmployeeId: Subject<number>;
  @Output() employeeDocumentsClicked = new EventEmitter();

  public employeeId:number = 0;
  public uploadPerCent : string;
  public documentList: Array<any>;
  public documentTypeList : Array<any>;
  public userDocumentUploadsForm : FormGroup;
  public serverBasePath = environment.basePath;

  constructor(private UploadProfilepicService:UploadProfilepicService,
              private route: ActivatedRoute) {
    super(UploadProfilepicService);
  }

  ngOnInit() {
    if(!this.employeeDocumentsInfo) {
      this.employeeDocumentsInfo = [];
    }
    this.initialize(); 
  }

  ngOnChanges(){
    if(this.employeeDocumentsInfo){
      this.initialize();
    }
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:any) => {
      this.employeeId = params['uid'];
      this.getEmployeeDocuments(this.employeeId);
    })
  }

  public upload(files: File[]){
    if(this.userDocumentUploadsForm.get("documentTypeId").value > 0) {
      var formData = new FormData();
      Array.from(files).forEach(f => formData.append('file', f, f.name));
      formData.append("userId", this.employeeId.toString());
      formData.append("documentTypeId", this.userDocumentUploadsForm.get("documentTypeId").value);
      this.UploadProfilepicService.uploadDocument(formData).subscribe((event:any) => {
        if (event && event.type === HttpEventType.UploadProgress) {
          let percentDone = Math.round(100 * event.loaded / event.total);
          this.uploadPerCent = percentDone.toString();
          console.log("Percentage Done " + percentDone);
        } else if (event && event instanceof HttpResponse) {
          let uploadSuccess = true;
          this.uploadPerCent = '0';
          this.userDocumentUploadsForm.reset();
          console.log("Upload Success " + uploadSuccess);
          this.getEmployeeDocuments(this.employeeId);
        }
      });
    } else {      
      this.userDocumentUploadsForm.reset();
      this.showAlert("Please select the document type");
    }
  }

  public deleteDocument(documentId:number, userId:number){
    if(confirm("Are you sure to delete this document?. Click 'Ok' to delete the document else 'Cancel'.")){
      let docInfo = { "usersFileId" : documentId, "userId" : userId };
      this.UploadProfilepicService.deleteEmployeeDocumentById(docInfo).subscribe((resp:any)=>{
        if(resp.status == "success"){
          this.getEmployeeDocuments(this.employeeId);
        }
      });
    }
  }

  public isImage(fileName:string){
    return fileName.match(/.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/i);
  }

  protected initialize() {
    this.userDocumentUploadsForm = new FormGroup({
      documentTypeId : new FormControl(''),
      description : new FormControl(''), 
      document : new FormControl(''),
    });

    this.getDocumentTypes();
  }
  
  protected getEmployeeDocuments(employeeId:number){
    if(employeeId > 0){
      this.UploadProfilepicService.getEmployeeDocuments(employeeId).subscribe((resp:any) => {
        this.documentList = resp.usersFiles;
      });
    }
  }

  protected getDocumentTypes(){
    this.UploadProfilepicService.getDocumentTypes().subscribe((resp:any) => {
      this.documentTypeList = resp.employeeDocumentTypes;
    });
  }    
}
