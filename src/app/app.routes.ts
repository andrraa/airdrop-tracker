import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];
