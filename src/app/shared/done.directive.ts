import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDone]'
})

export class DoneDirective {
  constructor (el: ElementRef ) {
    el.nativeElement.style.color = 'green';
  }
}
