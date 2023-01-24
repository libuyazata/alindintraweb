import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { DocumenttypesService } from '@app/general-info/document-types/document-types.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.scss']
})
export class DocumenttypesComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public DocumenttypesList : Array<any>;
  public serviceReportSearchForm : FormGroup;
  public addItemForm: FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;

  public itemName: string = "Document Types";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;


  constructor(private DocumenttypesService : DocumenttypesService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(DocumenttypesService);
  }

  ngOnInit() {    
    this.serviceReportSearchForm = new FormGroup({
      //callManagementStatus : new FormControl(''),
      searchKeyWord : new FormControl(''),
      //dateFrom : new FormControl(''),
      //dateTo : new FormControl('')
    });    
    //this.getOnGoingCallManagementList();
	this.getDocumenttypesList();
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
    })

  }

  public onDocumenttypesSearched(){
    // Combination of Call Management "OnGoing" status and service report data is the work Status.
    this.getOnGoingCallManagementList();    
  }

  /*
    Combination of Call Management "OnGoing" status and service report data is the work Status.
  */
  protected getOnGoingCallManagementList() {
    let searchFilter = this.serviceReportSearchForm.value;    
    let params = { 
      "dateFrom" : "",
      "dateTo" : "",
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "callStatus" : 1
    };
    this.DocumenttypesService.getDocumenttypesList(params).subscribe((resp:any)=>{
      this.onGoingServiceReportList = resp["callStatus"]; 
    });
  }

	
  protected getDocumenttypesList() {
	/* let params = {
      status : 1
    } */
	const status=1;
	this.DocumenttypesService.getDocumenttypesList(status).subscribe((resp:any)=>{      
	  this.DocumenttypesList = resp["models"];
    });
  }
	
  openCreateForm() {
    this.isFormVisible = true;
    this.isEdit = false;

    this.initializeForm(null)
  }
  closePopup() {
    this.clearForm();
    this.resetForm();
  }
  private clearForm() {
    this.isEdit = false;
    this.isFormVisible = false;
    this.isFormSubmitInitiated = false;
  }
   resetForm() {
    this.addItemForm.reset();
  }
  private initializeForm(data: any) {
    this.addItemForm = new FormGroup({
      documentTypeId : new FormControl((null != data ? data.documentTypeId : '')),
      type : new FormControl((null != data ? data.type : ''), Validators.required),
      desc : new FormControl((null != data ? data.desc : ''), Validators.required)
    });
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.DocumenttypesService.saveOrUpdateDocumenttypesList(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getDocumenttypesList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  private getPreparedParams(submitData: any) {

    let params : {[k : string]: any}= {
      type : submitData.type,
      desc : submitData.desc,
	  documentTypeId : submitData.documentTypeId
	  //createdOn: "2023-01-24",
      //updatedOn: "2023-01-24"
	  //status : submitData.status
    }

    /* if(this.isEdit) {
      params.documentTypeId = submitData.documentTypeId
     // params.status =0
    } */

    return params;
  }
  private getItemList() {
    let params = {}
    this.DocumenttypesService.getDocumenttypesList(params).subscribe((resp:any)=>{      
      this.DocumenttypesList = resp["Documenttypes"];
    });
  }
  editItem(item: any) {
    this.isEdit = true;
    this.isFormVisible = true;
    this.initializeForm(item);
  }
  //#region public function
  deleteItem(item: any) {
    /* let params = {
      documentTypeId : item.documentTypeId
    }; */
	const documentTypeId = item.documentTypeId;
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, documentTypeId);
  }
  public onConfirmDelete(_self: any, documentTypeId: any) {
    _self.DocumenttypesService.deleteDocumenttypes(documentTypeId).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getDocumenttypesList();
    });
  }
  openServiceRequest(item : any) { 
    item.isStatusSetVisible = ! item.isStatusSetVisible;

    if(this.previousItem != null && item != this.previousItem) {
      this.previousItem.isStatusSetVisible = false;
    }

    this.previousItem = item;
  }
  // Convenience getter for easy access to attendance form fields.
  get itemForm() { return this.addItemForm.controls; }

}
