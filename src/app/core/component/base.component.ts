import { Component, OnInit, ChangeDetectorRef, Injector  } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective, FormControlName } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { BaseService } from './../services/base.service';

const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
FormControlDirective.prototype.ngOnChanges = function () {
  if(this.valueAccessor._elementRef) {
    this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
  }
  return originFormControlNgOnChanges.apply(this, arguments);
};

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  if(this.valueAccessor._elementRef){
    this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  }
  return result;
};

// export class Notifier {
//   valueReceived: (val: number) => void = (d: number) => { };
// }

@Component({
  selector: 'app-base-component',
  template: ''
})
export class BaseComponent implements OnInit {

  private LINE_BREAKER:string;

  public yearNameData: any; // Class to which the candidate belongs
  public classDivisionNameData: any; // Division
  public genderData: any; 
  
  constructor(protected baseService: BaseService) { 
      this.LINE_BREAKER = "\n";
  }

  ngOnInit() {
        
  }

  protected initView(){
    this.loadMasters();
  }

  protected loadMasters() {
     
  }

  protected getUserId() : number {
    let userId = 0;
    let savedCredentials = sessionStorage.getItem("credentials") || localStorage.getItem("credentials");
    if (savedCredentials) {
      userId = JSON.parse(savedCredentials).userId;
    }
    return userId;
  }

  protected makeDropDownSelected(form:FormGroup, values:any) {
    for(var index=0;index<values.length;index++){
      form.patchValue(values[index]);
    }
  }

  protected findInvalidControls(form:FormGroup) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push({ "name" : name, "control" : controls[name] });
        }
    }
    return invalid;
  }

  /*
  Iterates (single level form group)  through a FomGroup and get the elements
  */
  protected getElementsAttrValue(form:FormGroup, attribute:string) {    
    let elements:Array<any>;
    let invalid = <FormControl[]>Object.keys(form.controls).map(key => form.controls[key]).filter(ctl => ctl.invalid);
    if (invalid.length > 0) {
      if(attribute === "placeholder"){
        // elements.push( {"control":invalid[0], "attr" : invalid[0].nativeElement.placeholder });
      }
    }
    return elements;    
  }

  private prepareInvalidFormSubmitMessage(form:FormGroup){
    let message:string = "It is required to enter all mandatory fields before submitting." + 
                         this.LINE_BREAKER + this.LINE_BREAKER + "Please " + this.LINE_BREAKER;
    let invalidCtrls = this.findInvalidControls(form);
    for(let index = 0;index < invalidCtrls.length; index++) {
      let control = invalidCtrls[index].control as any; 
      let errorMessage = control.nativeElement.getAttribute("data-errormessage");
      if(errorMessage) {
        message += "- " + errorMessage + this.LINE_BREAKER;
      }
    }
    return message;
  }

  protected showAlert(message:string, title?:string){
    if(!title){
      title = "Message";
    }
    alert(message);
  }

  protected  showValidationError(form:FormGroup){
    let message = this.prepareInvalidFormSubmitMessage(form);
    this.showAlert(message);
  }

  // Extracts the javascript date object from a MyDatePicker component.
  protected getDateFromMyDP(date:any){
    let dateObj = null;
    if(date && date.jsdate){
      dateObj = date.jsdate;
    } else if(date && date.date){
      dateObj = new Date(date.date.year + "-" + date.date.month + "-" + date.date.day).toISOString();
    }
    return dateObj;
  }

  protected getCountryList() : Observable<any>{
    return this.baseService.getCountryList();
  }

  // Performs a deep copy of the array
  protected cloneObjectArray(array:any) : Array<any> {
    return array.map((x:any) => Object.assign({}, x));
  }
} 
