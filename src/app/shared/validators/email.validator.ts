import { AbstractControl, ValidationErrors } from '@angular/forms';

export const email = (control: AbstractControl): ValidationErrors | null => {
    const emailRegExp: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value = control.value;
    const isValid = emailRegExp.test(value);
    if (!isValid) {
        return { email: 'the email is not valid' };
    }
    return null;
};
