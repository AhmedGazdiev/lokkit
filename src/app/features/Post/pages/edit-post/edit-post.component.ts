import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditPostFormComponent } from '@/app/features/post/components/edit-post-form/edit-post-form.component';

@Component({
    selector: 'app-edit-post',
    imports: [EditPostFormComponent],
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
    private route = inject(ActivatedRoute);
    public editId: string | null = null;

    ngOnInit(): void {
        this.editId = this.route.snapshot.paramMap.get('id');
        console.log(this.editId);
    }
}
