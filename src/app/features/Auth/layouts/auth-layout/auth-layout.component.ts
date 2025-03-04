import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@/app/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '@/app/shared/components/header/header.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {}
