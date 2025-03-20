import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'create-post',
    imports: [],
    templateUrl: './create-post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent {}
