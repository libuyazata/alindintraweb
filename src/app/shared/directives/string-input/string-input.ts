import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Generated class for the StringInputDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[string-input]', // Attribute selector
})
export class StringInputDirective {
  @Input() maximumLength:any;
  @Input() inputContentType:any;
  constructor(private el: ElementRef, private control: NgControl) { }
  @HostListener('input', ['$event'])
  onChange($event:any) {
    let inputVal = (this.el.nativeElement).value;
    if (this.maximumLength) {
      if (inputVal.length > this.maximumLength) {
        inputVal = String(inputVal).substring(0, this.maximumLength);
      }
    }

    if (Number(this.inputContentType) === 0) {
      inputVal = inputVal ? inputVal.replace(/[^a-z ]/gi, '') : '';
    } else if (Number(this.inputContentType) === 1) {
      inputVal = inputVal ? inputVal.replace(/[^a-z.0-9 ]/gi, '') : '';
    }
    this.control.control.setValue(inputVal);
  }

}
