import { Component, inject, ViewEncapsulation } from '@angular/core';
import { IconModule } from '../../modules/icon.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import {
  SignUpRequest,
  SignUpResponse,
  SignUpValidationError,
} from '../models/sign-up.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FailedResponse, SuccessResponse } from '../../models/base.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationComponent } from '../../components/validation/validation.component';
import { SignInRequest, SignInResponse } from '../models/sign-in.model';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [CommonModule, IconModule, ReactiveFormsModule, ValidationComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  validationErrors: SignUpValidationError = {};

  signUpForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  isLoading: boolean = false;

  async signUp() {
    this.validationErrors = {};

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { name, email, password } = this.signUpForm.value;

    const data: SignUpRequest = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response: SuccessResponse<SignUpResponse> =
        await this.authService.signUp(data);

      if (response.success) {
        const signInData: SignInRequest = {
          email: email,
          password: password,
        };

        const signInResponse: SuccessResponse<SignInResponse> =
          await this.authService.signIn(signInData);

        if (signInResponse.data) {
          this.authService.saveUserData(signInResponse.data);
          this.router.navigateByUrl('');
        }
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if ('errors' in error.error) {
          const errorResponse =
            error.error as FailedResponse<SignUpValidationError>;
          this.validationErrors = errorResponse.errors ?? {};
        }
      }
    } finally {
      this.isLoading = false;
    }
  }
}
