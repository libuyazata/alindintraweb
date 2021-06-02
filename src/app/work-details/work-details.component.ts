import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { WorkDetailsService } from '@app/work-details/work-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss']
})
export class WorkDetailsComponent extends BaseComponent implements OnInit {
   
  public onGoingServiceReportList : Array<any>;
  public serviceReportSearchForm : FormGroup;
  
  constructor(private workDetailsService : WorkDetailsService, 
              private route: ActivatedRoute) { 
    super(workDetailsService);
  }

  ngOnInit() {     
    this.serviceReportSearchForm = new FormGroup({
      //callManagementStatus : new FormControl(''),
      searchKeyWord : new FormControl(''),
      //dateFrom : new FormControl(''),
      //dateTo : new FormControl('')
    });    
    this.getOnGoingCallManagementList();
  }

  public onWorkDetailsSearched(){
    // Combination of Call Management "OnGoing" status and service report data is the work details.
    this.getOnGoingCallManagementList();    
  }

  /*
    Combination of Call Management "OnGoing" status and service report data is the work details.
  */
  protected getOnGoingCallManagementList() {
    let searchFilter = this.serviceReportSearchForm.value;    
    let params = { 
      "dateFrom" : "",
      "dateTo" : "",
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "callStatus" : 1
    };
    this.workDetailsService.getWorkDetailsList(params).subscribe((resp:any)=>{
      this.onGoingServiceReportList = resp["callDetails"]; 
    });
  }

}
