import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  FailedResponse,
  SuccessResponse,
  TokenBaseModel,
} from '../../models/base.model';
import {
  SignUpRequest,
  SignUpResponse,
  SignUpValidationError,
} from '../models/sign-up.model';
import { firstValueFrom } from 'rxjs';
import {
  SignInRequest,
  SignInResponse,
  SignInValidationError,
} from '../models/sign-in.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiBaseUrl = environment.api_base_url;

  // SIGN UP
  async signUp(
    data: SignUpRequest
  ): Promise<
    SuccessResponse<SignUpResponse> | FailedResponse<SignUpValidationError>
  > {
    const signUpUrl = this.apiBaseUrl + '/v1/auth/sign-up';

    try {
      return await firstValueFrom(
        this.httpClient.post<SuccessResponse<SignUpResponse>>(signUpUrl, data)
      );
    } catch (error) {
      throw error as FailedResponse<SignUpValidationError>;
    }
  }

  // SIGN IN
  async signIn(
    data: SignInRequest
  ): Promise<
    SuccessResponse<SignInResponse> | FailedResponse<SignInValidationError>
  > {
    const signInUrl = this.apiBaseUrl + '/v1/auth/sign-in';

    try {
      return await firstValueFrom(
        this.httpClient.post<SuccessResponse<SignInResponse>>(signInUrl, data)
      );
    } catch (error) {
      throw error as FailedResponse<SignInValidationError>;
    }
  }

  // REFRESH TOKEN
  refreshToken() {
    const refresTokenUrl = this.apiBaseUrl + '/v1/auth/refresh';
    return this.httpClient.post<SuccessResponse<TokenBaseModel>>(
      refresTokenUrl,
      null
    );
  }

  // SAVE USER DATA
  saveUserData(data: SignInResponse) {
    localStorage.setItem('user_name', data.user.name);
    localStorage.setItem('user_email', data.user.email);
    localStorage.setItem('access_token', data.token.accessToken);
  }
}
