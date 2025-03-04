import { Routes } from '@angular/router';
import { InfoComponent } from '@features/profile/pages/info/info.component';
import { SettingsComponent } from '@features/profile/pages/settings/settings.component';
import { DevicesComponent } from '@features/profile/pages/devices/devices.component';

export const profileRoutes: Routes = [
    { path: 'info', title: 'Profile Info', component: InfoComponent },
    { path: 'settings', title: 'Profile Settings', component: SettingsComponent },
    { path: 'devices', title: 'Profile Devices', component: DevicesComponent }
];
