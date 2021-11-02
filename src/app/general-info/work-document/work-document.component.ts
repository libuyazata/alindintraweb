import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { WorkDocumentService } from '@app/general-info/work-document/work-document.service';

@Component({
  selector: 'app-work-document',
  templateUrl: './work-document.component.html',
  styleUrls: ['./work-document.component.scss']
})
export class WorkDocumentComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public workDocumentList : Array<any>;
  public serviceReportSearchForm : FormGroup;
  public addItemForm: FormGroup;

  //Status variables
  public isFormVisible : boolean = false;
  public isEdit : boolean = false;
  public isFormSubmitInitiated : boolean = false;

  public itemName: string = "Document Category";
  public materialRequestSearchForm : FormGroup;
  private previousItem : any;


  constructor(private WorkDocumentService : WorkDocumentService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(WorkDocumentService);
  }

  ngOnInit() {    
    this.serviceReportSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
     
    });    
	this.getWorkDocumentList();
	this.materialRequestSearchForm = new FormGroup({
      type : new FormControl(''),
      drawingSeries : new FormControl(''),
    })
  }
	
  protected getWorkDocumentList() {
	const status = 1;
	this.WorkDocumentService.getWorkDocumentList(status).subscribe((resp:any)=>{      
	  this.workDocumentList = resp["models"];
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
	 drawingSeries : new FormControl((null != data ? data.drawingSeries : ''), [Validators.required, Validators.minLength(3)]),
	 });
  }
  onAddItem() { 
    this.isFormSubmitInitiated = true;
    if( this.addItemForm.valid ) { 
      let submitData = this.addItemForm.value;

      let params = this.getPreparedParams(submitData);

      this.WorkDocumentService.saveDocumentTypes(params).subscribe((resp:any)=>{      
		if(resp.status == "success") {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), true);
          this.resetForm();
          this.clearForm();
          this.getWorkDocumentList();
        } else {
          this.alertService.showSaveStatus(this.itemName.toLowerCase(), false);
        }
      });

    
    }
  };
  private getPreparedParams(submitData: any) {

    let params : {[k : string]: any}= {
      documentTypeId : submitData.documentTypeId,
	  type : submitData.type,
      drawingSeries : submitData.drawingSeries,
    }

   /*  if(this.isEdit) { 
      params.documentTypeId = submitData.documentTypeId,
      params.status = 1
    } */

    return params;
  }
 
  editItem(item: any) {
    this.isEdit = true;
    this.isFormVisible = true;
    this.initializeForm(item);
  }
  //#region public function
  deleteItem(item: any) {
   /*  let params = {
      documentTypeId : item.documentTypeId
    }; */
	const params=item.documentTypeId;
    this.alertService.showPermenantDeleteConfirmation(this, this.itemName.toLowerCase(), this.onConfirmDelete, params);
  }
  public onConfirmDelete(_self: any, params: any) {
    _self.WorkDocumentService.deleteDocumentTypes(params).subscribe((resp: any) => {
      let deleteStatus = resp.status == "success";
      _self.alertService.showDeleteStatus(_self.itemName.toLowerCase(), deleteStatus);
      _self.getWorkDocumentList();
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
