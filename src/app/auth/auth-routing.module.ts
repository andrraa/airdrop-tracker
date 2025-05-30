import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { guestGuard } from '../guards/guest.guard';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
