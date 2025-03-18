import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { required } from '@shared/validators';

@Component({
    selector: 'register-form',
    imports: [MatInput, MatFormField, MatLabel, MatButton, ReactiveFormsModule],
    templateUrl: './register-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
    public registerForm = new FormGroup({
        fullname: new FormControl('', required),
        username: new FormControl('', required),
        email: new FormControl('', required),
        password: new FormControl('', required),
        confirmPassword: new FormControl('', required)
    });

    get fullnameControl() {
        return this.registerForm.get(['fullname']);
    }
    get usernameControl() {
        return this.registerForm.get(['username']);
    }
    get emailControl() {
        return this.registerForm.get(['email']);
    }
    get passwordControl() {
        return this.registerForm.get(['password']);
    }
    get confirmPasswordControl() {
        return this.registerForm.get(['confirmPassword']);
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        }
    }
}
