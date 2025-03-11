import { Component } from '@angular/core';
import { EditPostFormComponent } from '@features/post/components/edit-post-form/edit-post-form.component';

@Component({
    selector: 'app-edit-post',
    imports: [EditPostFormComponent],
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {}
