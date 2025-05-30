import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { AuthService } from '../service/auth.service';
import { AuthError } from '@supabase/supabase-js';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormErrorComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { fullname, email, password } = this.registerForm.value;

    try {
      const { user, session } = await this.authService.signUp({
        email: email,
        password: password,
        options: {
          data: {
            fullname: fullname,
          },
        },
      });

      console.log('User: ' + user?.id);
      console.log('Session: ' + session);
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        alert(error.message);
      }
    }
  }
}
