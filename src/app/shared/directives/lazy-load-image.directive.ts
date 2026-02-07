import { Directive } from '@angular/core';

@Directive({
  selector: '[appLazyLoadImage]',
  standalone: true
})
export class LazyLoadImageDirective {

  constructor() { }

}
