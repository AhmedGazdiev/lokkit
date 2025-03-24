import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditPostFormComponent } from '@features/post/components/edit-post-form/edit-post-form.component';

@Component({
    selector: 'create-post',
    imports: [EditPostFormComponent],
    templateUrl: './edit-post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostComponent {}
