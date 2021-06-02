import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[number-only]',
})
export class NumbersOnlyDirective {
  @Input() maxValue: string;
  @Input() maximumLength:any;
  @Input() minValue: string;
  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('input', ['$event'])
  onChange($event:any) {
    let inputVal = (this.el.nativeElement).value;
    inputVal = (-1 === inputVal) ? '0' : inputVal;
    inputVal = inputVal ? inputVal.replace(/[^0-9]/g, '') : '';
    if (this.maxValue) {
      if (parseFloat(inputVal) > parseFloat(this.maxValue)) {
        inputVal = this.maxValue;
      }
    }
    if (this.minValue) {
      if (parseFloat(inputVal) < parseFloat(this.minValue)) {
        this.el.nativeElement.style.color = 'red';
      }
    }
    if (this.minValue && this.maxValue) {
      if (parseFloat(inputVal) >= parseFloat(this.minValue) && (parseFloat(inputVal) <= parseFloat(this.maxValue))) {
        this.el.nativeElement.style.color = 'white';
      }
    }
    if (this.maximumLength) {
      inputVal = String(inputVal).substring(0, this.maximumLength);
    }
    this.control.control.setValue(inputVal);
  }
}
