import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value.length < min) {
            return { minLength: `min length is ${min}` };
        }
        return null;
    };
}
