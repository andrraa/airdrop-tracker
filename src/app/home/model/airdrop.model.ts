interface AirdropBase {
  name: string;
  link: string;
  faucetLink?: string;
  referralLink?: string;
  type: string;
  loginType: string;
  wallet?: string;
  status: number;
  description?: string;
}

export interface AirdropRequest extends AirdropBase {
  parentId: number;
}

export interface AirdropResponse extends AirdropBase {
  id: number;
  children?: AirdropBase[];
}

export interface AirdropValidationError {
  name: string[];
  link: string[];
  faucetLink?: string[];
  referralLink?: string[];
  type: string[];
  loginType: string[];
  wallet?: string[];
  status: string[];
  description?: string[];
}
