import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropDownItem } from './drop-down.type';

@Component({
    selector: 'drop-down',
    imports: [RouterLink],
    templateUrl: './drop-down.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownComponent {
    @Input('appDropDown') dropDownItems!: DropDownItem[];
    public showDropdown = false;
}
