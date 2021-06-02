import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[decimal-number]',
})
export class DecimalNumberDirective {
  @Input() maxValue: string;
  @Input() allowNegative: boolean;
  constructor(private el: ElementRef, private control: NgControl) {
  }
  @HostListener('input', ['$event'])
  onChange() {
    const regex = this.allowNegative ? /[^-0-9\.]/g : /[^0-9\.]/g;
    let inputVal = this.el.nativeElement ? (this.el.nativeElement).value.replace(regex, '') : '';
    const negativeCheck = inputVal.split('-');
    const decimalCheck = inputVal.split('.');

    if (negativeCheck.length > 1) {
      negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
      inputVal = negativeCheck[0] + '-' + negativeCheck[1];
      if (negativeCheck[0].length > 0) {
        inputVal = negativeCheck[0];
      }

    }

    if (decimalCheck.length > 1) {
      inputVal = decimalCheck[0] + '.' + decimalCheck[1].substring(0, 2);
    }

    if (this.maxValue) {
      if (parseFloat(inputVal) > parseFloat(this.maxValue)) {
        inputVal = this.maxValue;
      }
    }

    this.control.control.setValue(inputVal);
  }
}
