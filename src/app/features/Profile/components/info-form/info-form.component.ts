import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
    selector: 'app-info-form',
    imports: [InputComponent, ReactiveFormsModule],
    templateUrl: './info-form.component.html',
    styleUrl: './info-form.component.scss'
})
export class InfoFormComponent implements OnInit {
    private userService = inject(UserService);
    activeUser = signal<User | null>(null);

    constructor() {
        this.userService.activeUser$.subscribe(user => {
            this.activeUser.set(user);
        });
    }

    ngOnInit(): void {
        this.profileInfoForm.patchValue({
            fullName: this.activeUser()?.fullName,
            username: this.activeUser()?.username,
            city: this.activeUser()?.city,
            story: this.activeUser()?.story
        });
    }

    public profileInfoForm = new FormGroup({
        fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        username: new FormControl('', [Validators.required]),
        city: new FormControl(''),
        story: new FormControl('', [Validators.maxLength(200)])
    });

    public onSubmit() {
        if (this.profileInfoForm.valid) {
            this.userService
                .updateUser(this.activeUser()?.id as number, this.profileInfoForm.value as User)
                .subscribe();
            console.log('Successfully updated profileInfo:', this.profileInfoForm.value);
        }
    }
}
