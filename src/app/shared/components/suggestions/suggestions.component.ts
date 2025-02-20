import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import {UsernamePipe} from '../../pipes/username.pipe';

@Component({
  selector: 'app-suggestions',
  imports: [IconComponent, UsernamePipe],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss',
})
export class SuggestionsComponent {}
