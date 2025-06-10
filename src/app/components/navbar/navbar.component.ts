import { Component, inject, ViewEncapsulation } from '@angular/core';
import { IconModule } from '../../modules/icon.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface NavMenu {
  name: string;
  icon: string;
  route: string;
}

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, IconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  private router = inject(Router);

  userName: string = localStorage.getItem('user_name') ?? '';
  userEmail: string = localStorage.getItem('user_email') ?? '';

  isOpen = false;

  toggleNavbar(): void {
    this.isOpen = !this.isOpen;
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/sign-in');
  }

  // NAV ITEM
  navItem: NavMenu[] = [
    {
      name: 'Dashboard',
      icon: 'home',
      route: '',
    },
    {
      name: 'Friends',
      icon: 'users',
      route: '/friends',
    },
    {
      name: 'Profile',
      icon: 'settings',
      route: '/profile',
    },
  ];
}
