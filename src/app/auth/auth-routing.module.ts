import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { guestGuard } from '../guards/guest.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In - Airdrop Tracker',
    canActivate: [guestGuard],
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    title: 'Sign Up - Airdrop Tracker',
    canActivate: [guestGuard],
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
