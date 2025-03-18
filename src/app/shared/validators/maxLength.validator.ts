import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value.length > max) {
            return { maxLength: `max length is ${max}` };
        }
        return null;
    };
}
