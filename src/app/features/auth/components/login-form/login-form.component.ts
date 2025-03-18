import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'login-form',
    imports: [MatInput, MatFormField, MatLabel, MatButton, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    private fb = inject(FormBuilder);

    public loginForm = this.fb.group({
        email: this.fb.control('', []),
        password: this.fb.control('', [])
    });

    onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
    }
}
