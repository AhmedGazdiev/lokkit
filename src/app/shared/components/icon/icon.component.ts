import { Component, Input } from '@angular/core';
import { iconTypes } from '@shared/types/types';

@Component({
    selector: 'app-icon',
    imports: [],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss'
})
export class IconComponent {
    @Input('icon') icon!: iconTypes;
}
