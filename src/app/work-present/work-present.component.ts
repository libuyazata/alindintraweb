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
  

  constructor(private WorkpresentService : WorkpresentService,
			  private alertService : AlertNotificationService,  
              private route: ActivatedRoute) { 
    super(WorkpresentService);
  }

  ngOnInit() {    
	this.getpresentWorkList();
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

}
