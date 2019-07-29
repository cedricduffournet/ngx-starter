export interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
}

export interface Credentials {
  login: string;
  password: string;
}

export interface ResetPassword {
  plainPassword: {
    first: string;
    second: string;
  };
}

export interface Register extends ResetPassword {
  civility: number;
  firstname: string;
  lastname: string;
  email: string;
  confirmationUrl: string;
}

export interface SendResetPassword {
  username: string;
}
