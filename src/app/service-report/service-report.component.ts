import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceReportService } from '@app/service-report/service-report.service';
import { BaseComponent } from '@app/core/component/base.component';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss']
})
export class ServiceReportComponent extends BaseComponent implements OnInit {

  public serviceReportList : Array<any>;
  public serviceReportSearchForm : FormGroup;

  constructor(private serviceReportService : ServiceReportService) { 
    super(serviceReportService);
  }

  ngOnInit() { 
    /*
    
    */    
    this.serviceReportSearchForm = new FormGroup({
      serviceReportStatus : new FormControl(''),
      searchKeyWord : new FormControl(''),
      dateFrom : new FormControl(''),
      dateTo : new FormControl(''),
      gurenteePeriod : new FormControl('')
    });
    this.serviceReportSearchForm.patchValue({"gurenteePeriod" : "all"});
    this.serviceReportSearchForm.patchValue({"serviceReportStatus" : "all"});
    this.getServiceReportList();
  }

  public onServiceReportSearched(){   
    this.getServiceReportList();    
  }

  // public onServiceReportStatusChanged(event:any){
  //   this.getServiceReportList();
  // }

  // Convenience getter for easy access to service report form fields.
  get serviceReportSrchForm() { return this.serviceReportSearchForm.controls; }

  protected getServiceReportList() {
    let searchFilter = this.serviceReportSearchForm.value;
    let params = {
       //"callStatus"  : searchFilter.serviceReportStatus,
       "dateFrom" : searchFilter.dateFrom == null ? "" : searchFilter.dateFrom,
       "dateTo" : searchFilter.dateTo == null ? "" : searchFilter.dateTo,
       "searchKeyWord" : searchFilter.searchKeyWord == null ? "" : searchFilter.searchKeyWord,
       "gurenteePeriod" : "all"
    }
    this.serviceReportService.searchServiceReport(params).subscribe((resp:any)=>{      
      this.serviceReportList = resp["serviceReports"];
    });
  }  
}
