import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data: { component: 'dashboard' }
  },
  {
    path: 'home',
    component: HomeComponent
  },
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
