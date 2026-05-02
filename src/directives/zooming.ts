import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appZooming]',
})
export class Zooming {
  constructor() { }
  //when double click on img zoom in
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement;
      if (img.style.transform === 'scale(2)') {
        img.style.transform = 'scale(1)';
        img.style.transition = 'transform 0.3s ease';
      } else {
        img.style.transform = 'scale(2)';
        img.style.transition = 'transform 0.3s ease';
      }
    }
  }
}
