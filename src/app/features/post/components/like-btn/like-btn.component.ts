import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '@shared/components';

@Component({
    selector: 'like-btn',
    imports: [IconComponent],
    templateUrl: './like-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeBtnComponent {
    public readonly id = input.required<string>();

    like() {}
    unlike() {
        console.log('id', this.id());
    }
}
