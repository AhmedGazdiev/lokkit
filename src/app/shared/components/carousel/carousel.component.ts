import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageUpload } from '@core/services/upload-images.service';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'carousel',
    imports: [IconComponent],
    templateUrl: './carousel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
    @Input() images: ImageUpload[] = [];
    public current: number = 0;

    public next() {
        this.current = (this.current + 1) % this.images.length;
    }

    public prev() {
        this.current = (this.current - 1 + this.images.length) % this.images.length;
    }
}
