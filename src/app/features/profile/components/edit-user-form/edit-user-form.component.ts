import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '@core/services';
import { maxLength, minLength } from '@shared/validators';

@Component({
    selector: 'edit-user-form',
    imports: [MatButton, ReactiveFormsModule, MatInput, MatFormField, MatLabel, MatButton],
    templateUrl: './edit-user-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserFormComponent {
    private readonly dialog = inject(MatDialogRef<EditUserFormComponent>);
    private readonly fb = inject(FormBuilder);
    public readonly auth = inject(AuthService).authData;
    public _avatar = signal<any | null>(null);

    public editUserForm = this.fb.group({
        fullname: this.fb.control('', [minLength(6)]),
        mobile: this.fb.control(
            '',
            Validators.pattern(/^(\+7|8|7)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/)
        ),
        address: this.fb.control(''),
        website: this.fb.control(''),
        story: this.fb.control('', [minLength(20), maxLength(200)])
    });

    changeAvatar(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;
        const file = input.files[0];
        this._avatar.set(file);
    }

    ifAvatar() {
        return this._avatar() ? URL.createObjectURL(this._avatar()) : this.auth()?.avatar;
    }

    removeAvatar() {
        this._avatar.set(null);
    }

    onSubmit(): void {
        if (this.editUserForm.valid) {
            console.log(this.editUserForm.value, this._avatar());
            this.dialog.close();
        }
    }
}
