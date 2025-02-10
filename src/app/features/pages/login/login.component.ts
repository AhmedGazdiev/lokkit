import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [IconComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
