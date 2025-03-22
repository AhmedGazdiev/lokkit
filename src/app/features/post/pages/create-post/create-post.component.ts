import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreatePostFormComponent } from '../../components/create-post-form/create-post-form.component';

@Component({
    selector: 'create-post',
    imports: [CreatePostFormComponent],
    templateUrl: './create-post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent {}
