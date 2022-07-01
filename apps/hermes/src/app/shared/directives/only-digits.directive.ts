import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[hermesOnlyDigits]',
})
export class OnlyDigitsDirective {
  constructor(private _el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      this.control.control?.setValue(this._el.nativeElement.value);
      event.stopPropagation();
    }
  }
}
