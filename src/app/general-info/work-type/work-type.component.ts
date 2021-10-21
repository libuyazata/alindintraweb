import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { WorkTypeService } from '@app/general-info/work-type/work-type.service';

@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html',
  styleUrls: ['./work-type.component.scss']
})
export class WorkTypeComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public workStatusList : Array<any>;
  public serviceReportSearchForm : FormGroup;
  public addItemForm: FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;

  public itemName: string = "Work Type";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;


  constructor(private workStatusService : WorkTypeService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(workStatusService);
  }

  ngOnInit() {    
    this.serviceReportSearchForm = new FormGroup({
      //callManagementStatus : new FormControl(''),
      searchKeyWord : new FormControl(''),
      //dateFrom : new FormControl(''),
      //dateTo : new FormControl('')
    });    
    //this.getOnGoingCallManagementList();
	this.getWorkStatusList();
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
    })
  }

  public onWorkStatusSearched(){
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
    this.workStatusService.getWorkStatusList(params).subscribe((resp:any)=>{
      this.onGoingServiceReportList = resp["callStatus"]; 
    });
  }

	
  protected getWorkStatusList() {
	let params = {
      status : 1
    }
	this.workStatusService.getWorkStatusList(params).subscribe((resp:any)=>{      
	  this.workStatusList = resp["workStatusList"];
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
      workTypeId : new FormControl((null != data ? data.workTypeId : '')),
      workType : new FormControl((null != data ? data.workType : ''), Validators.required),
      description : new FormControl((null != data ? data.description : ''), Validators.required)
    });
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.workStatusService.saveOrUpdateWorkStatusList(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getWorkStatusList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  private getPreparedParams(submitData: any) {

    let params : {[k : string]: any}= {
      workType : submitData.workType,
      description : submitData.description,
      workTypeId : submitData.workTypeId,
	  status : submitData.status
    }

    if(this.isEdit) { 
      params.workTypeId = submitData.workTypeId,
      params.status = 1
    }

    return params;
  }
  private getItemList() {
    let params = {}
    this.workStatusService.getWorkStatusList(params).subscribe((resp:any)=>{      
      this.workStatusList = resp["workStatusList"];
    });
  }
  editItem(item: any) {
    this.isEdit = true;
    this.isFormVisible = true;
    this.initializeForm(item);
  }
  //#region public function
  deleteItem(item: any) {
    let params = {
      workTypeId : item.workTypeId
    };
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
  public onConfirmDelete(_self: any, params: any) {
    _self.workStatusService.deleteworkStatus(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getWorkStatusList();
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
