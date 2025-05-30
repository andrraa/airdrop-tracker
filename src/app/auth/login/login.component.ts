import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { AuthError } from '@supabase/supabase-js';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const { session } = await this.authService.signIn({
        email: email,
        password: password,
      });

      if (session) {
        this.router.navigate(['']);
      }
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        alert(error.message);
      }
    }
  }
}
