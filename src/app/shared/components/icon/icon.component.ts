import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { iconTypes } from '@shared/types';

@Component({
    selector: 'icon',
    imports: [],
    templateUrl: './icon.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
    @Input('icon') icon!: iconTypes;
}
