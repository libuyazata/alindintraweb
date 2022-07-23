import { Component, Input, OnInit, EventEmitter, Output, OnChanges, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { BaseComponent } from '@app/core/component/base.component';
import { UploadProfilepicService } from '@app/shared/components/upload-profile-pic/upload-profile-pic.service';
import { Subject } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';

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
  public imageSrc : string;
  public profilepic : string;
  public documentList: Array<any>;
  public documentTypeList : Array<any>;
  public userDocumentUploadsForm : FormGroup;
  public minsOfMeetingForm : FormGroup;
  public serverBasePath = environment.basePath;
  protected fileToUpload : any; // MoM files
  public isMomFormAttemptSubmit: Boolean;
  public isShown : boolean = false;

  constructor(private uploadProfileService:UploadProfilepicService,private alertService : AlertNotificationService,
              private route: ActivatedRoute) {
    super(uploadProfileService);
	this.isMomFormAttemptSubmit = false;

  }

  ngOnInit() {
    if(!this.employeeDocumentsInfo) {
      this.employeeDocumentsInfo = [];
    }
	
	//this.initialize(); 
	this.initializeForm(null);
	this.route.queryParams.subscribe((params:any) => {
      this.employeeId = params['uid'];
	  this.getEmployeeDetailsById(this.employeeId);
	  this.minsOfMeetingForm.patchValue({
		employeeId: this.employeeId,
		});
    })	
	//this.profilepic = "AlindUploadFiles/Employee/ProfilePic/default/default.jpg";

  }

  ngOnChanges(){
    if(this.employeeDocumentsInfo){
      this.initialize();
    }
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:any) => {
      this.employeeId = params['uid'];
      //this.getEmployeeDocuments(this.employeeId);
    })
  }
  
  protected getEmployeeDetailsById(employeeId:number){
    let empParams = { "employeeId" : employeeId};
    this.uploadProfileService.getEmployeeDetailsById(empParams).subscribe((emp: any) => {
      this.profilepic = emp.employee.profilePicPath;
	  //alert(emp.employee.profilePicPath);
    });
  }
  public onMoMFileSelected(files: FileList) {
    this.isShown = true;
	this.fileToUpload = files.item(0);
	const file = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
  }
  
  public onMoMDetailsSubmitted(){
    this.isMomFormAttemptSubmit = true;
	if(!this.minsOfMeetingForm.invalid) {      
      var formData = new FormData();     
      if(this.fileToUpload){
        formData.append('profilePic', this.fileToUpload, this.fileToUpload.name);
      }
      formData.append("employeeId", this.momForm.employeeId.value);
      //console.log(formData);
      this.uploadProfileService.uploadEmployeeProfilePic(formData).subscribe((event:any)=>{        
        if (event && event instanceof HttpResponse) {
          //this.closeMoMModalView();
          //this.getNewWorkDetails();
          //alert("The details has been submitted successfully.");
          this.isMomFormAttemptSubmit = false;
		  this.isShown = false;
		  this.alertService.showSaveStatus("Profile picture", true);
		  this.resetMoMView();

		}
      })
    }
    console.log(this.minsOfMeetingForm.value);
  }
  
  private initializeForm(data: any) {
    this.minsOfMeetingForm = new FormGroup({
      employeeId : new FormControl(''),
      profilePic : new FormControl('',Validators.required),
    });
  }
  public upload(files: File[]){
    if(this.userDocumentUploadsForm.get("documentTypeId").value > 0) {
      var formData = new FormData();
      Array.from(files).forEach(f => formData.append('file', f, f.name));
      formData.append("userId", this.employeeId.toString());
      formData.append("documentTypeId", this.userDocumentUploadsForm.get("documentTypeId").value);
      this.uploadProfileService.uploadDocument(formData).subscribe((event:any) => {
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
      this.uploadProfileService.deleteEmployeeDocumentById(docInfo).subscribe((resp:any)=>{
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
      this.uploadProfileService.getEmployeeDocuments(employeeId).subscribe((resp:any) => {
        this.documentList = resp.usersFiles;
      });
    }
  }

  protected getDocumentTypes(){
    this.uploadProfileService.getDocumentTypes().subscribe((resp:any) => {
      this.documentTypeList = resp.employeeDocumentTypes;
    });
  }
  protected resetMoMView(){
    this.minsOfMeetingForm.reset();
  }
   
  get momForm() { return this.minsOfMeetingForm.controls; }

}
