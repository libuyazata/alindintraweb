import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { DatePipe } from '@angular/common';

import { ProjectService } from '@app/project/project.service';
import { IMyDpOptions } from 'mydatepicker';
import { BaseComponent } from '@app/core/component/base.component';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { DepartmentService } from '@app/department/department.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends BaseComponent implements OnInit {

  public uploadPerCent: string;
  public selectedProjectId : number; // Project Id selected for editing.
  public saveProjectForm : FormGroup;
  public projectSearchForm : FormGroup;
  public projectPaymentStatusForm : FormGroup;
  public projectDocumentUploadsForm : FormGroup;

  public employeeList : Array<any>;
  public departmentList : Array<any>;
  public projectNameList : Array<any>; // Copy of project list
  public projectInfoList : Array<any>;  // Contains all projects
  public documentTypeList : Array<any>; // Project document types
  public projectDocumentList : Array<any>; // Documents in a project
  // public projectInfoLive : Array<any>;  // Contains the projects of status in progress.
  //public projectStatusList : Array<any>;
  //public paymentStatusList : Array<any>;
  // public projectResourceList : Array<any>;
  public projectDocResourceList : Array<any>
  public projectPaymentInfoList : Array<any>;
  public userProjectAllocationInfo : Array<any>;    // Contains the allocated projects for a user.

  public isProjectFormAttemptSubmit : Boolean = false;
  public isProjectSearchFormAttemptSubmit : Boolean = false;
  public isProjectPaymentFormAttemptSubmit : Boolean = false;
  public isProjectDocumentsTabDisabled : Boolean = true;
  public isprojectDocumentUploadsFormAttemptSubmit :Boolean = false; // Default its disabled, if project id available enable it

  public projectPickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd mmm yyyy',
      inline: false,
  };

  constructor(private projectService:ProjectService,
              private departmentService: DepartmentService,
              private sanitizer: DomSanitizer) {
    super(projectService);
  }

  ngOnInit() {
    this.saveProjectForm = new FormGroup({
      projectId : new FormControl(),
      projectName : new FormControl('', Validators.required),
      // projectCode : new FormControl('', Validators.required),
      // amcCode : new FormControl(''),
      description : new FormControl(''),
      // projectStatusId : new FormControl('', Validators.required),
      startDate : new FormControl('', Validators.required),
      endDate : new FormControl('', Validators.required),
      departmentId: new FormControl('', Validators.required),
      employeeId: new FormControl(''),
      // quotationNo : new FormControl(''),
      // purchaseOrderNo : new FormControl(''),
      // contactNo : new FormControl(''),
      // projectJobCardApproval : new FormControl(''),
      // detailsOfSuppliers : new FormControl(''),
      // detailsOfSubContractors : new FormControl(''),
      // comments : new FormControl(''),
      // projectValue : new FormControl(''),
      // amountReceived : new FormControl(''),
      // outstandingAmount : new FormControl(''),
      // scopeOfWork : new FormControl(''),
      // paymentStatus : new FormControl(''),
      // contractRefNo : new FormControl(''),
      // dateOfContract : new FormControl(''),
      // clientName : new FormControl(''),
    });

    this.projectSearchForm = new FormGroup({
      employeeId : new FormControl('', Validators.required),
      projectId : new FormControl('', Validators.required),
      projectDocumentId: new FormControl('', Validators.required),
      readPermission: new FormControl(true, Validators.required),
      writePermission: new FormControl(true, Validators.required),
      startDate : new FormControl('', Validators.required),
      endDate : new FormControl('', Validators.required),
    });

    this.projectPaymentStatusForm = new FormGroup({
      projectPaymentStatusid : new FormControl(''),
      projectId : new FormControl('', Validators.required),
      amountReceived : new FormControl('', Validators.required),
      amountReceivedDate : new FormControl('', Validators.required),
      remarks : new FormControl(''),
      retention : new FormControl(''),
      securityBond : new FormControl(''),
      bankName : new FormControl(''),
      chequeNo : new FormControl(''),
      invoiceNo : new FormControl(''),
    });

    this.projectDocumentUploadsForm = new FormGroup({
      projectId : new FormControl(''),
      documentTypeId : new FormControl(''),
      documentName : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      document : new FormControl(''),
      projectDocumentId: new FormControl(''),
    });

    this.getProjectList();
    this.getEmployeeList();
    this.getDocumentTypes();
    this.getDepartmentList();
    // this.getProjectStatusList();
    // this.getPaymentStatusList(); // Status like Open, Close etc
    // this.getProjectPaymentStatusList(); // Payment List
  }

  /* Add / Save Project View  Model Open Close Method */
  public openProjectView() {
    this.isProjectDocumentsTabDisabled = true;
    document.getElementById('projectViewModal').classList.toggle('d-block');
  }

  public resetAndOpenProjectForm() {
    this.saveProjectForm.reset();
    this.isProjectFormAttemptSubmit = false;
    document.getElementById('projectViewModal').classList.toggle('d-block');
  }

  public closeProjectView() {
    this.selectedProjectId = 0;
    this.saveProjectForm.reset();
    this.isProjectDocumentsTabDisabled = true;
    document.getElementById('projectViewModal').classList.toggle('d-block');
  }
  /* End of Add / Save Project View */

  /* Project Payment Model Open Close Method */

  // public openProjectPaymentView() {
  //   this.isProjectDocumentsTabDisabled = true;
  //   document.getElementById('projectPaymentViewModal').classList.toggle('d-block');
  // }

  // public resetAndOpenProjectPaymentForm() {
  //   this.projectPaymentStatusForm.reset();
  //   this.isProjectPaymentFormAttemptSubmit = false;
  //   document.getElementById('projectPaymentViewModal').classList.toggle('d-block');
  // }

  // public closeProjectPaymentView() {
  //   this.projectPaymentStatusForm.reset();
  //   document.getElementById('projectPaymentViewModal').classList.toggle('d-block');
  // }

  /* End of Project Payment */

  // public onProjectPaymentSubmitted(){
  //   this.isProjectPaymentFormAttemptSubmit = true;
  //   if(!this.projectPaymentStatusForm.invalid) {
  //     let projectPaymentInfo = this.projectPaymentStatusForm.value;
  //     projectPaymentInfo.amountReceivedDate = this.getDateFromMyDP(projectPaymentInfo.amountReceivedDate);
  //     this.projectService.saveProjectPayment(projectPaymentInfo).subscribe((resp:any)=>{
  //       if(resp.status == "success") {
  //         this.getProjectPaymentStatusList();
  //         this.showAlert("Project payment details has been submitted successfully.");
  //       }
  //     });
  //   }
  //   console.log(this.projectPaymentStatusForm.value);
  // }

  // public editProjectPaymentDetails(projectPaymentInfo:any){
  //   this.openProjectPaymentView()
  //   this.projectPaymentStatusForm.patchValue(projectPaymentInfo);
  //   this.setProjectPaymentDates(new Date(projectPaymentInfo.amountReceivedDate));
  // }

  /* Project Save / Edit Methods */

  public editProjectDetails(projectInfo:any){
    this.openProjectView();
    this.saveProjectForm.patchValue(projectInfo);
    if(projectInfo.projectId > 0){
      this.selectedProjectId = projectInfo.projectId;
      this.isProjectDocumentsTabDisabled = false;
    }
    this.setProjectDates(new Date(projectInfo.startDate), new Date(projectInfo.endDate),  new Date(projectInfo.dateOfContract));
  }

  public onProjectDetailsSubmitted() {
    this.isProjectFormAttemptSubmit = true;
    if(!this.saveProjectForm.invalid) {
      let projectInfo = this.saveProjectForm.value;
      projectInfo.startDate = this.getDateFromMyDP(projectInfo.startDate);
      projectInfo.endDate = this.getDateFromMyDP(projectInfo.endDate);
      projectInfo.employeeId = this.getUserId().toString();
      // projectInfo.dateOfContract = this.getDateFromMyDP(projectInfo.endDate);
      this.projectService.saveProject(projectInfo).subscribe((resp:any)=>{
        if(resp.project) {
          this.selectedProjectId = resp.project.projectId;
          this.showAlert("Project details has been saved successfully. Please add the necessary documents from the \"Project Documents\" tab.");
          this.getProjectList();
        } else {
          this.showAlert("An error occured while processing the request.")
        }
      })
    }
  }

   /* End of Project Save / Edit Methods */

  // public onProjectSelectionChanged(event:any){
  //   let projectId = event.target.value;
  //   if(projectId != "") {
  //     //this.getResourcesByProject(projectId);
  //   } else {
  //     //this.projectResourceList = []; // Reset it.
  //   }
  // }

  public onProjectDocumentSelectionChanged(event:any){
    let projectDocumentId = event.target.value;
    if(projectDocumentId != "") {
      this.getResourcesByProjectDocument(projectDocumentId);
    } else {
      this.projectDocResourceList = []; // Reset it.
    }
  }

  public onProjectAssigned(){
    if(!this.projectSearchForm.invalid) {
      let projectResource = this.projectSearchForm.value;
      projectResource.startDate = this.getDateFromMyDP(projectResource.startDate);
      projectResource.endDate = this.getDateFromMyDP(projectResource.endDate);

      let employeeAssignData: any = this.getEmployeeAssignData(projectResource);
      this.projectService.assignProjectResource(employeeAssignData).subscribe((resp:any)=>{
        this.showAlert("Assigned project successfully.");
        // this.getProjectByResourceId(projectResource.employeeId);
        //this.getResourcesByProject(projectResource.projectId);
      });
    }
  }

  public onUserSelected(event:any){
    this.getProjectByResourceId(event.target.value);
  }

  // Convenience getter for easy access to project form fields.
  get projectForm() { return this.saveProjectForm.controls; }

  // get projectPaymentForm() { return this.projectPaymentStatusForm.controls; }

  // Convenience getter for easy access to project search form fields.
  get projectSearchFormFields() { return this.projectSearchForm.controls; }

  get projectDocumentUploadsFormFields() { return this.projectDocumentUploadsForm.controls; }


  // protected getProjectStatusList(){
  //   this.projectService.getProjectStatusList().subscribe( (resp:any) => {
  //     this.projectStatusList = resp;
  //   });
  // }

  // protected getPaymentStatusList(){
  //   // Status like Open, Close, ...
  //   this.projectService.getPaymentStatusList().subscribe( (resp:any) => {
  //     this.paymentStatusList = resp;
  //   });
  // }

  protected getProjectList(){
    let allprojects = { "departmentId" : -1, "projectId": -1 };
    this.projectService.getProjectList(allprojects).subscribe((resp:any) => {
      this.projectInfoList = resp.projectInfos;
      this.projectNameList = this.cloneObjectArray(this.projectInfoList);
      // this.projectInfoLive = this.cloneObjectArray(this.projectInfoList).filter((proj:any)=> proj.projectStatusId == 2);
    });
  }

  // protected getResourcesByProject(projectId:number){
  //   let projectSearch = { "projectId" : projectId };
  //   this.projectService.getProjectResourceList(projectSearch).subscribe((resp:any) => {
  //     this.projectResourceList = resp.projectResources;
  //   });
  // }

  protected getResourcesByProjectDocument(projectDocumentId:number){
    let projecDoctSearch = { "projectDocumentId" : projectDocumentId };
    this.projectService.getProjectDocumentResourceList(projecDoctSearch).subscribe((resp:any) => {
      this.projectDocResourceList = resp.documentUsers;
    });
  }

  protected getEmployeeList(){
    this.projectService.getEmployeeNames().subscribe((resp:any) => {
      this.employeeList = resp.employees;
    });
  }

  // protected getProjectPaymentStatusList(){
  //   let projectInfo = { "projectId" : -1 }; // TODO: Select the project Id from the drop down list
  //   this.projectService.getProjectPaymentStatusList(projectInfo).subscribe((resp:any) => {
  //     this.projectPaymentInfoList = resp.projectPaymentStatus;
  //   });
  // }

  protected getProjectByResourceId(userId:number) {
    if(userId){
      let userInfo = { "userId" : userId }
      this.projectService.getProjectByResource(userInfo).subscribe((resp:any)=>{
        this.userProjectAllocationInfo = resp.projectDetails;
      });
    }
  }

  protected setProjectDates(startDate:Date, endDate:Date, dateOfContract:Date): void {
    this.saveProjectForm.patchValue({startDate: {
      date: {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate()}
    }});

    this.saveProjectForm.patchValue({endDate: {
      date: {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate()}
    }});

    this.saveProjectForm.patchValue({dateOfContract: {
      date: {
          year: dateOfContract.getFullYear(),
          month: dateOfContract.getMonth() + 1,
          day: dateOfContract.getDate()}
      }});
  }

  protected setProjectPaymentDates(amountRecived:Date): void {
    this.projectPaymentStatusForm.patchValue({amountRecivedDate: {
    date: {
        year: amountRecived.getFullYear(),
        month: amountRecived.getMonth() + 1,
        day: amountRecived.getDate()}
    }});
  }

  protected getDepartmentList(){
    this.departmentService.getDepartmentList({})
      .subscribe((departmentListData: any) => {
        this.departmentList = departmentListData.departments;
    });
  }

  protected getDocumentTypes(){
    this.projectService.getProjectDocumentTypes().subscribe((resp: any) => {
      this.documentTypeList = resp.documentTypes;
    });
  }

  protected getAllProjectDocuments(projectId:number, documentTypeId:number = -1){
    let params = { "projectId" : projectId, "documentTypeId" : documentTypeId };
    this.projectService.getProjectDocuments(params).subscribe((resp: any) => {
      this.projectDocumentList = resp.projectDocuments;
    });
  }

  public upload(files: File[]){
    this.isprojectDocumentUploadsFormAttemptSubmit = true;
    if(!this.projectDocumentUploadsForm.invalid) {
      if(this.projectDocumentUploadsForm.get("documentTypeId").value > 0) {
        var formData = new FormData();
        Array.from(files).forEach(f => formData.append('file', f, f.name));
        formData.append("userId", this.getUserId().toString());
        formData.append("projectId", this.projectDocumentUploadsForm.get("projectId").value);
        formData.append("documentName", this.projectDocumentUploadsForm.get("documentName").value);
        formData.append("documentTypeId", this.projectDocumentUploadsForm.get("documentTypeId").value);
        formData.append("description", this.projectDocumentUploadsForm.get("description").value);
        formData.append("projectDocumentId",
          this.projectDocumentUploadsForm.get("projectDocumentId").value?
          this.projectDocumentUploadsForm.get("projectDocumentId").value: "0"
        );
        this.projectService.uploadDocument(formData).subscribe((event:any) => {
          this.isprojectDocumentUploadsFormAttemptSubmit = false;
          if (event && event.type === HttpEventType.UploadProgress) {
            let percentDone = Math.round(100 * event.loaded / event.total);
            this.uploadPerCent = percentDone.toString();
            console.log("Percentage Done " + percentDone);
          } else if (event && event instanceof HttpResponse) {
            let uploadSuccess = true;
            this.uploadPerCent = '0';
            this.projectDocumentUploadsForm.reset();
            console.log("Upload Success " + uploadSuccess);
            // this.getEmployeeDocuments(this.employeeId);
            // Call get project documents
          }
        });
      } else {
        this.projectDocumentUploadsForm.reset();
        this.showAlert("Please select the document type");
      }
    }else{
      this.projectDocumentUploadsForm.controls['document'].reset()
      // this.projectDocumentUploadsForm.reset();
    }
  }

  public onProjectDocProjectSelected(event:any){
    let projectId = -1;
    let documentTypeId = -1;
    if(this.projectDocumentUploadsForm.get("projectId").value > 0){
      projectId = this.projectDocumentUploadsForm.get("projectId").value;
    }
    if(this.projectDocumentUploadsForm.get("documentTypeId").value > 0){
      documentTypeId = this.projectDocumentUploadsForm.get("documentTypeId").value;
    }
    this.getAllProjectDocuments(projectId, documentTypeId);
  }

  public onProjectDocSearchProjectSelected(event: any) {
    let projectId = -1;
    let documentTypeId = -1;
    if(this.projectSearchForm.get("projectId").value > 0){
      projectId = this.projectSearchForm.get("projectId").value;
    }
    // if(this.projectSearchForm.get("documentTypeId").value > 0){
    //   documentTypeId = this.projectSearchForm.get("documentTypeId").value;
    // }
    this.getAllProjectDocuments(projectId, documentTypeId);
  }

  // public convertSizeInBytes(x:any){
  //   // We need a pipe for this for a quick fix, implementing so
  //   const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   let l = 0, n = parseInt(x, 10) || 0;
  //   while(n >= 1024 && ++l){
  //       n = n/1024;
  //   }
  //   //include a decimal point and a tenths-place digit if presenting
  //   //less than ten of KB or greater units
  //   return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  // }

  public onUpdateProjectDocument(projectDoc: any){
    this.projectDocumentUploadsForm.reset();
    const {
      projectId,
      documentName,
      documentTypeId,
      projectDocumentId,
      description,
    } = projectDoc;
    this.projectDocumentUploadsForm.patchValue({
      userId: this.getUserId().toString(),
      projectId,
      documentName,
      documentTypeId,
      projectDocumentId,
      description,
    });
  }

  public downloadFile(documentInfo:any){
    let docInfo = { "projectDocumentId" : documentInfo.projectDocumentId, "employeeId" : this.getUserId() };
    this.projectService.downloadProjectDocument(docInfo).subscribe((blob:any)=>{
      // let blob:any = new Blob([resp.blob()], { type: 'application/pdf; charset=utf-8' });
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      //const blob = new Blob([resp], { type: 'application/pdf' });

      //this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    })

  }

  protected getEmployeeAssignData(projectAssignDetails: any){

    const readPermission = this.projectSearchForm.get("readPermission").value;
    const writePermission = this.projectSearchForm.get("writePermission").value;
    projectAssignDetails.readPermission = readPermission? "1": "0";
    projectAssignDetails.writePermission = writePermission? "1": "0";

    return projectAssignDetails;
  }
}
