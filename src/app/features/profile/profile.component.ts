import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services';
import { PostService } from '@core/services/post.service';
import { UserService } from '@core/services/user.service';
import { IconComponent } from '@shared/components';
import { MenuItem } from '@shared/menu-item.type';
import { UsernamePipe } from '@shared/pipes';
import { Subject, takeUntil } from 'rxjs';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { FollowBtnComponent } from './components/follow-btn/follow-btn.component';

@Component({
    selector: 'profile',
    imports: [
        RouterOutlet,
        UsernamePipe,
        MatButton,
        IconComponent,
        MatTabsModule,
        RouterLink,
        RouterLinkActive,
        FollowBtnComponent
    ],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
    public readonly authService = inject(AuthService);
    public readonly userService = inject(UserService);
    public readonly postService = inject(PostService);
    private readonly route = inject(ActivatedRoute);
    private readonly dialog = inject(MatDialog);
    public id!: string;
    public userData = toSignal(this.userService.user$, { initialValue: null });
    public readonly newUserData = computed(() => this.userData());
    public usersData = toSignal(this.userService.users$, { initialValue: [] });
    public _postsLength = signal<number | null>(null);
    private destroy$ = new Subject<void>();
    public tabs!: MenuItem[];

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') as string;

        this.postService
            .getUserPosts(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => this._postsLength.set(Number(res.result)));

        if (this.data?._id === this.id) {
            this.userService.selectedUser(this.data);
        } else {
            if (this.usersData().every(user => user._id !== this.id)) {
                this.userService.getUserById(this.id).subscribe();
            } else {
                const newUser = this.usersData().find(user => user._id === this.id);
                if (newUser) this.userService.selectedUser(newUser);
            }
        }

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

    openModal() {
        this.dialog.open(EditUserFormComponent);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
