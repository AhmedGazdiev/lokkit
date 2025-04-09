import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { Post } from '@core/models/post';
import { AuthService } from '@core/services';
import { PostService } from '@core/services/post.service';
import { IconComponent } from '@shared/components';

@Component({
    selector: 'save-btn',
    imports: [IconComponent],
    templateUrl: './save-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveBtnComponent {
    public readonly post = input.required<Post>();
    public readonly postService = inject(PostService);
    public readonly authService = inject(AuthService);
    public _isSave = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (this.authService.authData()?.saved.find(_id => this.post()._id === _id)) {
                this._isSave.set(true);
            } else {
                this._isSave.set(false);
            }
        });
    }

    public save() {
        this.postService.savePost(this.post()._id).subscribe();
    }
    public unSave() {
        this.postService.unSavePost(this.post()._id).subscribe();
    }
}
