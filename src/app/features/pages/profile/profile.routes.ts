import { Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { InfoComponent } from './info/info.component';
import { SettingsComponent } from './settings/settings.component';

export const profileRoutes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'devices', component: DevicesComponent },
];
