import { UserBaseModel } from '../../models/base.model';

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse extends UserBaseModel {}

export interface SignUpValidationError {
  name?: string[];
  email?: string[];
  password?: string[];
}
