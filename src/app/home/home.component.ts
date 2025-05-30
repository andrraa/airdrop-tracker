import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Session } from '@supabase/supabase-js';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);

  user: Session | null = null;

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.session();
  }
}
