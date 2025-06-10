import { TokenBaseModel, UserBaseModel } from '../../models/base.model';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: UserBaseModel;
  token: TokenBaseModel;
}

export interface SignInValidationError {
  email?: string[];
  password?: string[];
}
