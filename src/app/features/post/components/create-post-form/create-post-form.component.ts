import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { maxLength, minLength, required } from '@shared/validators';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'create-post-form',
    imports: [IconComponent, MatButton, MatFormField, MatLabel, MatInput, ReactiveFormsModule],
    templateUrl: './create-post-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostFormComponent {
    private fb = inject(FormBuilder);

    public createPostForm = this.fb.group({
        content: this.fb.control(''),
        images: this.fb.array([])
    });

    public onSubmit() {
        if (this.createPostForm.valid) {
            console.log(this.createPostForm.value);
        }
    }
}
