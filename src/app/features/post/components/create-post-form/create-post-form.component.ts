import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'create-post-form',
    imports: [IconComponent, MatButton, MatFormField, MatLabel, MatInput],
    templateUrl: './create-post-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostFormComponent {}
