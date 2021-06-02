import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'user-project-allocation',
  templateUrl: './user-project-allocation.component.html',
  styleUrls: ['./user-project-allocation.scss']
})

export class UserProjectAllocationsComponent implements OnInit, OnChanges {

  
  @Input() allocationInfo: any;

  constructor(private datePipe:DatePipe) {
  }

  ngOnInit() {    
    if(!this.allocationInfo) {
      this.allocationInfo = [];
    }
  }

  ngOnChanges(){

  }
}
