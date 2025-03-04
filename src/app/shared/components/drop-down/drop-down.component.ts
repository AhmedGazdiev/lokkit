import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropDownItem } from './drop-down.type';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-drop-down',
    imports: [RouterLink, NgIf],
    templateUrl: './drop-down.component.html',
    styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
    @Input('appDropDown') dropDownItems!: DropDownItem[];
    showDropdown = false;
    ngOnInit() {
        console.log(this.dropDownItems);
    }
}
