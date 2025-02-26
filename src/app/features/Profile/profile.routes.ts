import {Routes} from '@angular/router';
import {DevicesComponent} from './pages/devices/devices.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {InfoComponent} from './pages/info/info.component';

export const profileRoutes: Routes = [
  {path: 'info', title:'Profile Info', component: InfoComponent},
  {path: 'settings', title:'Profile Settings', component: SettingsComponent},
  {path: 'devices', title:'Profile Devices', component: DevicesComponent},
];
