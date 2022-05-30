import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators,ValidatorFn } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';
import { AlertNotificationService } from '@app/shared/services/alertnotification.service';
import { WorkpresentService } from '@app/work-present/work-present.service';

@Component({
  selector: 'work-present',
  templateUrl: './work-present.component.html',
  styleUrls: ['./work-present.component.scss']
})
export class WorkpresentComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public presentWorkList : Array<any> = [];
  public workTypeList : Array<any>;
  public workDetailsList : Array<any>;
  public materialRequestSearchForm : FormGroup;


  constructor(private WorkpresentService : WorkpresentService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(WorkpresentService);
  }

  ngOnInit() {    
	this.getpresentWorkList();
	this.getWorkTypeList();
	this.materialRequestSearchForm = new FormGroup({
      searchKeyWord : new FormControl(''),
      workTypeId : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
    })
	this.materialRequestSearchForm.patchValue({"workTypeId" : 0});
  }
  

  protected getpresentWorkList() {
/* 	let params = {
      startDate : '2021-08-23',
      endDate : '2021-08-23',
      departmentId : 0
    }; */
	    const startDate = '2021-08-23';
	    const endDate = '2021-08-23';
	    const departmentId = 0;
	const params = startDate+'/'+endDate+'/'+departmentId;
	this.WorkpresentService.getWorkDetailsByDate(params).subscribe((resp:any)=>{      
	  this.presentWorkList = resp["models"];
    });
  }
  
  protected getWorkTypeList() {
	let params = {
      status : 1
    }
	this.WorkpresentService.getWorkTypeList(params).subscribe((resp:any)=>{      
	  this.workTypeList = resp["workStatusList"];
    });
  }
  protected getSearchParams(){
    let searchFilter = this.materialRequestSearchForm.value;    
    let params = {
      "startDate" : searchFilter.dateFrom == null ? "" : searchFilter.dateFrom,
      "endDate" : searchFilter.dateTo == null ? "" : searchFilter.dateTo,
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "workTypeId" : searchFilter.workTypeId == null ? "0" : searchFilter.workTypeId,
    }
    return params;
  }
  public onWorkDetailsSearched(){
    let params = this.getSearchParams();
    this.WorkpresentService.getWorkDetailsBySearch(params).subscribe((resp:any)=>{
	  this.presentWorkList = resp["models"];
    });
  }

}
