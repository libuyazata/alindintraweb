import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Subject} from 'rxjs';

import {IMyDpOptions} from 'mydatepicker';

import { UserManagementService } from './add-user.service';
import { BaseComponent } from '@app/core/component/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseComponent  implements OnInit, AfterViewInit {

  public isDocumentsTabDisabled: Boolean;
  public receivingEmployeeId: Subject<number> = new Subject();

  constructor(protected userMngtService: UserManagementService,              
              private datePipe: DatePipe, private route: ActivatedRoute) { 
      super(userMngtService);  
      this.isDocumentsTabDisabled = false; // Made false for testing purpose    
  }

  ngOnInit() { 
   
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
  
} 
