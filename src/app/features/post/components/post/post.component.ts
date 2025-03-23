import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Post } from '@core/models/post';
import { CarouselComponent, IconComponent } from '@shared/components';
import { ShowIfLikedDirective } from '@shared/directives';
import { MenuItem } from '@shared/menu-item.type';
import { UsernamePipe } from '@shared/pipes';

@Component({
    selector: 'post',
    imports: [
        CarouselComponent,
        IconComponent,
        UsernamePipe,
        ShowIfLikedDirective,
        MatFormField,
        MatLabel,
        MatInput,
        MatMenuModule,
        RouterLink
    ],
    templateUrl: './post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
    public readonly post = input.required<Post>({ alias: 'post' });
    public _showComments = signal<boolean>(false);
    public toggleComments() {
        this._showComments.set(!this._showComments());
    }

    public menuItems: MenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'Detail',
                link: ['/post', this.post()._id, 'detail']
            }
        ];
    }
}
