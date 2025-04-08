import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services';
import { PostService } from '@core/services/post.service';
import { UsernamePipe } from '@shared/pipes';
import { Subject, takeUntil } from 'rxjs';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'profile',
    imports: [RouterOutlet, UsernamePipe, MatButton, IconComponent],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
    public readonly authService = inject(AuthService);
    public readonly postService = inject(PostService);
    private readonly route = inject(ActivatedRoute);
    public id: string | null = null;
    public _postsLength = signal<number | null>(null);
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.postService
            .getUserPosts(String(this.id))
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => this._postsLength.set(Number(res.result)));
    }

    ifAuth() {
        return this.data?._id === this.id;
    }

    get data() {
        return this.authService.authData();
    }

    ngOnDestroy() {
        this.destroy$.next(); // Запускаем отписку
        this.destroy$.complete(); // Завершаем Subject
    }
}
