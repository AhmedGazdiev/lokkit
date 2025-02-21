import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IconComponent} from '../../../../shared/components/icon/icon.component';
import {InputComponent} from '../../../../shared/components/input/input.component';
import {PostService} from '../../../../core/services/post.service';

@Component({
  selector: 'app-create-post-form',
  imports: [
    FormsModule,
    IconComponent,
    ReactiveFormsModule, InputComponent
  ],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss'
})
export class CreatePostFormComponent {
  private postService = inject(PostService)
  public fileUrl: string | null = null;

  public postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    content: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    image: new FormControl(null, [Validators.required]),
    tags: new FormArray([])
  })

  onChangeFile(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.fileUrl = URL.createObjectURL(file);
      this.postForm.patchValue({
        image: file
      })
    }
  }

  get tags() {
    return this.postForm.get(['tags']) as FormArray;
  }

  addTag() {
    this.tags.push(new FormControl('', Validators.required));
  }

  deleteTag(index: number) {
    this.tags.removeAt(index)
  }


  onSubmit() {
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value)
    }
  }
}
