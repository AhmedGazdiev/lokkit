import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostService} from '../../../../core/services/post.service';
import {IconComponent} from '../../../../shared/components/icon/icon.component';
import {InputComponent} from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-edit-post-form',
  imports: [
    ReactiveFormsModule,
    IconComponent,
    InputComponent
  ],
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.scss'
})
export class EditPostFormComponent {
  private postService = inject(PostService)

  public editPostForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(12),
      Validators.maxLength(300)
    ]),
    image: new FormControl(null),
    tags: new FormArray([])
  })

  public fileUrl: string | null = null;

  onChangeFile(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.fileUrl = URL.createObjectURL(file);
      this.editPostForm.patchValue({
        image: file
      })
    }
  }

  get tags() {
    return this.editPostForm.get(['tags']) as FormArray;
  }

  addTag() {
    this.tags.push(new FormControl('', Validators.required));
  }

  deleteTag(index: number) {
    this.tags.removeAt(index)
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      this.postService.updatePost(this.editPostForm.value)
    }
  }
}
