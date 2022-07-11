import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Subject} from 'rxjs';

import {IMyDpOptions} from 'mydatepicker';
import { EditUserManagementService } from '@app/edit-user/edit-user.service';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends BaseComponent  implements OnInit, AfterViewInit {
  public employeeList : Array<any>;
  
  public isDocumentsTabDisabled: Boolean;
  public isProfilepicTabDisabled: Boolean;
  public receivingEmployeeId: Subject<number> = new Subject();

  constructor(private userMngtService: EditUserManagementService,              
              private datePipe: DatePipe, private route: ActivatedRoute) { 
      super(userMngtService);  
      this.isDocumentsTabDisabled = false; // Made false for testing purpose    
      this.isProfilepicTabDisabled = false; // Made false for testing purpose    
  }

  ngOnInit() { 
   /* let employeeId = params['uid'];
   this.getEmployeeList(employeeId); */
   
   this.route.queryParams.subscribe((params:any) => {
      let employeeId = params['uid'];
      this.getEmployeeList(employeeId);
    });
  }

  ngAfterViewInit(){
    this.route.queryParams.subscribe((params:any) => {
      let employeeId = params['uid'];
      this.getEmployeeDetails(employeeId);
    });
  }

  protected getEmployeeDetails(employeeId:number){
    if(employeeId > 0) {
      this.isDocumentsTabDisabled = false;
      this.receivingEmployeeId.next(employeeId);
    }    
  }
  
  protected getEmployeeList(employeeId:number) {
	let params = {
      employeeId : employeeId
    }
	this.userMngtService.getEmployeeList1(params).subscribe((resp:any)=>{      
	  this.employeeList = resp["employee"];
    });
  }  
  
} 
