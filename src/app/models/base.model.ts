export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface FailedResponse<E> {
  success: boolean;
  message: string;
  errors?: E;
}

export interface UserBaseModel {
  id: number;
  name: string;
  email: string;
  status: boolean;
  lastLogin: Date;
}

export interface TokenBaseModel {
  accessToken: string;
  type: string;
  expiredAt: number;
}
