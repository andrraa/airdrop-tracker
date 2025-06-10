import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-index',
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent {
  userName: string = localStorage.getItem('user_name') ?? '';
}
