import { Component } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { UsernamePipe } from '@shared/pipes/username.pipe';

@Component({
    selector: 'app-suggestions',
    imports: [IconComponent, UsernamePipe],
    templateUrl: './suggestions.component.html',
    styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent {}
