import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowIfLiked]',
  standalone: true
})
export class ShowIfLikedDirective {
  private template = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  @Input() set appShowIfLiked(likes: number) {
    this.viewContainer.clear();
    if (likes > 0) {
      this.viewContainer.createEmbeddedView(this.template);
    }
  }
}
