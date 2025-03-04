import { Component } from '@angular/core';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
    selector: 'app-settings',
    imports: [InputComponent],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {}
