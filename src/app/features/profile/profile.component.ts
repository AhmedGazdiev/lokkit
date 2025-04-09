import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services';
import { PostService } from '@core/services/post.service';
import { IconComponent } from '@shared/components';
import { MenuItem } from '@shared/menu-item.type';
import { UsernamePipe } from '@shared/pipes';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'profile',
    imports: [RouterOutlet, UsernamePipe, MatButton, IconComponent, MatTabsModule, RouterLink, RouterLinkActive],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
    public readonly authService = inject(AuthService);
    public readonly postService = inject(PostService);
    private readonly route = inject(ActivatedRoute);
    public id!: string;
    public _postsLength = signal<number | null>(null);
    private destroy$ = new Subject<void>();
    public tabs!: MenuItem[];

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') as string;

        this.postService
            .getUserPosts(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => this._postsLength.set(Number(res.result)));

        this.tabs = [
            {
                link: ['/profile', this.id, 'posts'],
                label: 'posts'
            },
            {
                link: ['/profile', this.id, 'tagged'],
                label: 'tagged'
            },
            {
                link: ['/profile', this.id, 'saved'],
                label: 'saved'
            }
        ];
    }

    ifAuth() {
        return this.data?._id === this.id;
    }

    get data() {
        return this.authService.authData();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
