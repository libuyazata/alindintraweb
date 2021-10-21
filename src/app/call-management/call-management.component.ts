import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/component/base.component';
import { CallManagementService } from '@app/call-management/call-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call-management',
  templateUrl: './call-management.component.html',
  styleUrls: ['./call-management.component.scss']
})
export class CallManagementComponent extends BaseComponent implements OnInit {
  
  public callStatusParam : String;
  
  public callManagementList : Array<any>;
  public callMngtSearchForm : FormGroup;
  
  constructor(private callManagementService : CallManagementService, 
              private route: ActivatedRoute) { 
    super(callManagementService);
  }

  ngOnInit() {     
    this.callMngtSearchForm = new FormGroup({
      callManagementStatus : new FormControl(''),
      searchKeyWord : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl('')
    });
    this.route.queryParams.subscribe(params => {
      if(params['cs']) {
        this.callStatusParam = params['cs'];
        this.callMngtSearchForm.patchValue({"callManagementStatus" : this.callStatusParam});
      }
    });
    this.getCallManagementList();
  }

  public onCallManagementSearched(){   
    this.getCallManagementList();    
  }

  protected getCallManagementApiUrl(){
    // let url = "";
    // let callStatus = "1";
    // if(callStatus == "1"){
    //   url = "/call/getOnGoingCalls";
    // } else if (callStatus == "2"){
    //   url = "/call/getCompletedCalls";
    // } else if (callStatus == "3"){
    //   url = "/call/getNonAllottedCalls";
    // } else {
    //   url = "";
    // }
  }

  protected getCallManagementList() {
    let searchFilter = this.callMngtSearchForm.value;
    let callStatus = searchFilter.callManagementStatus == "" ? -1 : parseInt(searchFilter.callManagementStatus);
    if(isNaN(callStatus)){
      callStatus = -1;
    }
    
    let params = { 
      "dateFrom" : searchFilter.dateFrom == null ? "" : searchFilter.dateFrom,
      "dateTo" : searchFilter.dateTo == null ? "" : searchFilter.dateTo,
      "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
      "callStatus" : callStatus
    };
    this.callManagementService.getCallManagementList(params).subscribe((resp:any)=>{
      this.callManagementList = resp["callDetails"]; // .filter((x:any) => x.cdId < 10);
    });
  }


}
