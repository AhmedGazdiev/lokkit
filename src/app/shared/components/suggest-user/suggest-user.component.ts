import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { User } from '@core/models/user';
import { UsernamePipe } from '../../pipes/username.pipe';

@Component({
    selector: 'suggest-user',
    imports: [UsernamePipe, MatButton, RouterLink],
    templateUrl: './suggest-user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestUserComponent {
    public readonly suggest = input.required<User>();
}
