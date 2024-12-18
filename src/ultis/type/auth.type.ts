export type LoginDto = {
    password: string;
    email: string;
}

export type TokenResponse = {
    accessToken: string;
    refreshToken: string;
}

export type VerifyCodeDto = {
    email: string;
    code: string;
}

export type RefreshResponse = {
    accessToken: string;
}

export type ForgotPasswordDto = {
    password: string;
    code: number;
    email: string;
}

export type ChangePasswordDto = {
    oldPassword: string;
    password: string;
}