import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DropDownItem} from './drop-down.type';

@Component({
  selector: 'app-drop-down',
  imports: [RouterLink],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
})
export class DropDownComponent {
  @Input('appDropDown') dropDownItems!: DropDownItem[];
  showDropdown = false;
}
