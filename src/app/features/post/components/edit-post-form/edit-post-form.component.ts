import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { PostService } from '@core/services/post.service';
import { IconComponent } from '@shared/components';
import { maxLength, minLength, required } from '@shared/validators';

@Component({
    selector: 'edit-post-form',
    imports: [IconComponent, MatButton, MatFormField, MatLabel, MatInput, ReactiveFormsModule],
    templateUrl: './edit-post-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostFormComponent {
    private fb = inject(FormBuilder);
    private postService = inject(PostService);

    public editPostForm = this.fb.group({
        content: this.fb.control('', [required, minLength(20), maxLength(200)]),
        images: this.fb.array([], required)
    });

    get images() {
        return this.editPostForm.get(['images']) as FormArray;
    }

    public removeImage(index: number) {
        this.images.removeAt(index);
    }

    public fileUrl(index: number) {
        const file = this.images.at(index).value;
        return URL.createObjectURL(file);
    }

    public changeImages(event: Event) {
        const inputFiles = event.target as HTMLInputElement;
        if (inputFiles.files) {
            const files = Array.from(inputFiles.files);
            files.forEach(file => {
                this.images.push(this.fb.control(file));
            });
            console.log(files);
        }
    }

    public onSubmit() {
        if (this.editPostForm.valid) {
            console.log(this.editPostForm.value);
        }
    }
}
