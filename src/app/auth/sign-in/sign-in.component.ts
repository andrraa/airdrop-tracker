import { Component, inject, ViewEncapsulation } from '@angular/core';
import { IconModule } from '../../modules/icon.module';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  SignInRequest,
  SignInResponse,
  SignInValidationError,
} from '../models/sign-in.model';
import { ValidationComponent } from '../../components/validation/validation.component';
import { FailedResponse, SuccessResponse } from '../../models/base.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule,
    Toast,
    ValidationComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class SignInComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);

  validationErrors: SignInValidationError = {};

  signInForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  isLoading: boolean = false;

  async signIn() {
    this.validationErrors = {};

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { email, password } = this.signInForm.value;

    const data: SignInRequest = {
      email: email,
      password: password,
    };

    try {
      const response: SuccessResponse<SignInResponse> =
        await this.authService.signIn(data);

      if (response.data) {
        this.authService.saveUserData(response.data);
      }

      this.router.navigateByUrl('');
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse =
          error.error as FailedResponse<SignInValidationError>;
        if ('errors' in error.error) {
          this.validationErrors = errorResponse.errors ?? {};
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: errorResponse.message,
          });
        }
      }
    } finally {
      this.isLoading = false;
    }
  }
}
