import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'create-post-form',
    imports: [],
    templateUrl: './create-post-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostFormComponent {}
