import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
})
export class HighlightOnHoverDirective {
  private el = inject(ElementRef);
  private render = inject(Renderer2);

  @HostListener('mouseenter') onMouseEnter() {
    this.render.addClass(this.el.nativeElement, 'hover');
    this.render.setStyle(
      this.el.nativeElement,
      'transition',
      'all 0.3s ease-in-out'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.render.removeClass(this.el.nativeElement, 'hover');
    this.render.setStyle(
      this.el.nativeElement,
      'transition',
      'all 0.3s ease-in-out'
    );
  }
}
