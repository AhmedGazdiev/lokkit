import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {IconComponent} from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, RouterLink, IconComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public userService = inject(UserService);
  private route = inject(ActivatedRoute);
  public profileId: string | null = null;

  ngOnInit(): void {
    this.profileId = this.route.snapshot.paramMap.get('id');
  }
}
