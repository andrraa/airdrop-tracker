import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [NavbarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent {}
