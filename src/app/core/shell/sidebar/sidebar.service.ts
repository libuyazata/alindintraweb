import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseService } from './../../services/base.service';


@Injectable()
export class SideBarService extends BaseService {

    visible: boolean;
    isScreenSmall: boolean


  constructor(public httpClient: HttpClient) { 
    super(httpClient);
    this.visible = true;
  }
  

  toggle() {
    this.visible = !this.visible;
  }


  
}
