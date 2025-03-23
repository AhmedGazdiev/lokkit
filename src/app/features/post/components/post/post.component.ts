import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Post } from '@core/models/post';
import { CarouselComponent } from '@shared/components';
import { ShowIfLikedDirective } from '@shared/directives';
import { UsernamePipe } from '@shared/pipes';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'post',
    imports: [CarouselComponent, IconComponent, UsernamePipe, ShowIfLikedDirective, MatFormField, MatLabel, MatInput],
    templateUrl: './post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
    public readonly post = input.required<Post>({ alias: 'post' });
    public _showComments = signal<boolean>(false);
    public toggleComments() {
        this._showComments.set(!this._showComments());
        console.log(this._showComments());
    }
}
