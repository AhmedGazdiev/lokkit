import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { User } from '@core/models/user';
import { AuthService } from '@core/services';
import { UserService } from '@core/services/user.service';

@Component({
    selector: 'follow-btn',
    imports: [MatButton],
    templateUrl: './follow-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowBtnComponent {
    private userService = inject(UserService);
    private authService = inject(AuthService);
    public readonly user = input<User | null>(null);
    public _isFollow = signal<boolean>(false);

    constructor() {
        effect(() => {
            const auth = this.authService.authData();
            if (this.user()?.followers.find(user => user._id === auth?._id)) {
                this._isFollow.set(true);
            } else {
                this._isFollow.set(false);
            }
        });
    }

    public follow() {
        this.userService.follow(this.user() as User).subscribe();
    }
    public unFollow() {
        this.userService.unFollow(this.user() as User).subscribe();
    }
}
