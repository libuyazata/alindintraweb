import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { GeneralInfoMenuService } from './general-info-menu.service';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';



@Component({
  selector: 'general-info-menu',
  templateUrl: './general-info-menu.component.html',
  styleUrls: ['./general-info-menu.component.scss']
})
export class GeneralInfoMenuComponent implements OnInit {
  public addItemuploadForm: FormGroup;

  public isuploadFormVisible : boolean = false;
  public isuploadEdit : boolean = false;
  public isuploadFormInitiated : boolean = false;
  public workDetailsById : Array<any>;
  public subtaskDetailsListbyId : Array<any>;

  public workDetailsList : Array<any>;
  public documentTypeList : Array<any>;
  protected fileToUpload : any; // MoM files
  public itemName: string = "Work";
  public subitemName: string = "Sub Task";
  public uploadName: string = "Upload Document";

  constructor(
  private GeneralInfoMenuService : GeneralInfoMenuService,
  private alertService : AlertNotificationService, 
  private router: Router) { }

  ngOnInit() {
	  
  }

  toggleMenu() {
  }
  
  openUploadForm() { 
    this.isuploadFormVisible = true;
    this.isuploadEdit = false;
    this.initializeuploadForm(null)
  }
  private initializeuploadForm(data: any) {
    this.addItemuploadForm = new FormGroup({
      departmentId : new FormControl((null != data ? data.departmentId : ''), Validators.required),
      subTaskId : new FormControl((null != data ? data.subTaskId : ''), Validators.required),
      workDetailsId : new FormControl((null != data ? data.workDetailsId : ''), Validators.required),
      description : new FormControl((null != data ? data.description : ''), Validators.required),
      documentName : new FormControl((null != data ? data.documentName : ''), Validators.required),
      documentTypeId : new FormControl((null != data ? data.documentTypeId : ''), Validators.required),
      docfile : new FormControl((null != data ? data.docfile : ''), Validators.required),
      });
	this.getWorkDetailsList();
	this.getDocumentTypes();
  }
  protected getDocumentTypes(){
	const status =1;
	this.GeneralInfoMenuService.getDocumentTypes(status).subscribe((resp:any) => {
      this.documentTypeList = resp["models"];
    });
  } 
    onAddDocument() { 
      this.isuploadFormInitiated = true;
      if( this.addItemuploadForm.valid ) { 
	  var formData = new FormData();
	  if(this.fileToUpload){
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
      }
	
	  formData.append("departmentId", this.addItemuploadForm.get("departmentId").value);
	  formData.append("workDetailsId", this.addItemuploadForm.get("workDetailsId").value);
	  formData.append("subTaskId", this.addItemuploadForm.get("subTaskId").value);
	  formData.append("description", this.addItemuploadForm.get("description").value);
	  formData.append("documentName", this.addItemuploadForm.get("documentName").value);
	  formData.append("documentTypeId", this.addItemuploadForm.get("documentTypeId").value);
	
	  this.GeneralInfoMenuService.saveWorkDocument(formData).subscribe((resp:any) => {	  
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.uploadName.toLowerCase(), true);
          this.resetuploadForm();
          this.clearuploadForm();
          //this.getWorkDetailsList();
		  window.location.reload();
        } else {
          this.alertService.showSaveStatus(this.uploadName.toLowerCase(), false);
        }
		
		
      });
	}
	}; 
    protected getSubTaskByWorkId(item:any){
	let params = {
      workDetailsId:item
    }
	this.GeneralInfoMenuService.getWorkDetailsById(params).subscribe((resp:any)=>{      
	  this.workDetailsById = resp["model"];
	  this.addItemuploadForm.patchValue({
		departmentId: this.workDetailsById['departmentId'],
		});
    });
	
	let params1 = {
      workDetailsId:item,
	  departmentId : 1,
	  status:1
    }
	this.GeneralInfoMenuService.getSubTaskByWorkId(params1).subscribe((resp:any)=>{      
	  this.subtaskDetailsListbyId = resp["models"];
	/*   this.addItemuploadForm.patchValue({
		departmentId: 12,
		}); */
    });
  }
	public onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
    }
	closeuploadPopup() {
    this.clearuploadForm();
    this.resetuploadForm();
  }
  private clearuploadForm() {
    this.isuploadEdit = false;
    this.isuploadFormVisible = false;
    this.isuploadFormInitiated = false;
  }
  resetuploadForm() {
    this.addItemuploadForm.reset();
  }
  protected getWorkDetailsList() {
	let params = {
      departmentId : 1,
	  status:1
    }
	this.GeneralInfoMenuService.getWorkDetailsList(params).subscribe((resp:any)=>{      
	  this.workDetailsList = resp["models"];
    });
  }
  get uploadForm() { return this.addItemuploadForm.controls; }

}

