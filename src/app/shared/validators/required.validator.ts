import { AbstractControl, ValidationErrors } from '@angular/forms';

export const required = (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '') {
        return { required: 'this field is required' };
    }
    return null;
};
