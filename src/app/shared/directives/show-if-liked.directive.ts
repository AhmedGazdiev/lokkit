import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[showIfLiked]'
})
export class ShowIfLikedDirective {
    private template = inject(TemplateRef);
    private container = inject(ViewContainerRef);

    @Input() set showIfLiked(likes: number) {
        this.container.clear();
        if (likes > 0) {
            this.container.createEmbeddedView(this.template);
        }
    }
}
