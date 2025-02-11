import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-drop-down',
  imports: [NgIf, RouterLink],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
})
export class DropDownComponent {
  @Input() avatar?: string;

  showDropdown = false;
  private router = inject(Router);

  logout() {
    this.router.navigate(['/login']);
  }
}
