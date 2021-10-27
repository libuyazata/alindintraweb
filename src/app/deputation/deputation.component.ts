import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { DeputationService } from '@app/deputation/deputation.service';

@Component({
  selector: 'app-deputation',
  templateUrl: './deputation.component.html',
  styleUrls: ['./deputation.component.scss']
})
export class DeputationComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public deputationList : Array<any>;
  public employeeList : Array<any>;
  public departmentList : Array<any>;
  public serviceReportSearchForm : FormGroup;
  public addItemForm: FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;

  public itemName: string = "Deputation";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;


  constructor(private DeputationService : DeputationService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(DeputationService);
  }

  ngOnInit() {    
    this.serviceReportSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
     
    });    
	this.getdeputationList();
	this.materialRequestSearchForm = new FormGroup({
      type : new FormControl(''),
      drawingSeries : new FormControl(''),
    })
	this.getDepartmentList();
	this.getAllEmployeeList();
  }
	
  protected getdeputationList() {
	const status = 0;
	this.DeputationService.getdeputationList(status).subscribe((resp:any)=>{      
	  this.deputationList = resp["models"];
    });
  }
  protected getAllEmployeeList() {
	let params = {
      status : 1
    }
	this.DeputationService.getAllEmployeeList(params).subscribe((resp:any)=>{      
	  this.employeeList = resp["employees"];
    });
  }
  protected getDepartmentList() {
    let params = {
      status : 1
    }
    this.DeputationService.getDepartmentList(params).subscribe((resp:any)=>{      
      this.departmentList = resp["departments"];
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
      deputationId : new FormControl((null != data ? data.deputationId : '')),
	  employeeId : new FormControl((null != data ? data.employeeId : ''), Validators.required),
	  deputedDepartmentId : new FormControl((null != data ? data.deputedDepartmentId : ''), Validators.required),
	  description : new FormControl((null != data ? data.description : ''), Validators.required),
	  startDate : new FormControl((null != data ? data.startDate : ''), [Validators.required, Validators.minLength(3)]),
	  endDate : new FormControl((null != data ? data.endDate : ''), [Validators.required,this.dateRangeValidator]),
	 /*  createdOn : new FormControl((null != data ? data.createdOn : '')),
	  updatedOn : new FormControl((null != data ? data.updatedOn : ''))
 */	 });
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.DeputationService.saveDeputation(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getdeputationList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  private getPreparedParams(submitData: any) {

    let params : {[k : string]: any}= {
      employeeId : submitData.employeeId,
      deputedDepartmentId : submitData.deputedDepartmentId,
      description : submitData.description,
      startDate : submitData.startDate,
      endDate : submitData.endDate,
	 /*  createdOn : submitData.createdOn,
      updatedOn : submitData.updatedOn, */
	  deputationId : submitData.deputationId,
    }

   /*  if(this.isEdit) { 
      deputationId : submitData.deputationId
    } */

    return params;
  }
   private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.addItemForm && this.addItemForm.get("startDate").value;
    const to = this.addItemForm && this.addItemForm.get("endDate").value;
		if (from && to) {
		  invalid = new Date(from).valueOf() > new Date(to).valueOf();
		}
		return invalid ? { invalidRange: { from, to } } : null;
  };
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
	const params=item.deputationId;
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
  public onConfirmDelete(_self: any, params: any) {
    _self.DeputationService.deleteDeputation(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getdeputationList();
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
