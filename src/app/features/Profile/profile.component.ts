import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
    selector: 'app-profile',
    imports: [RouterOutlet, RouterLink, IconComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {}
