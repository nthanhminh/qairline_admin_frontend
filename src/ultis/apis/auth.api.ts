import { baseUrl } from "../constants";
import { ChangePasswordDto, ForgotPasswordDto, LoginDto, TokenResponse, VerifyCodeDto } from "../type/auth.type";
import { DataApiResponse } from "../type/commom.type";
import Cookies from "js-cookie";

export const login = async (dto: LoginDto) => {
    try {
        const response = await fetch(`${baseUrl}/auth/signin`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dto),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<TokenResponse> = await response.json();
        const data: TokenResponse = parseResponse.data;
        Cookies.set(
            'accessToken', 
            data.accessToken, 
            { 
                path: '/', 
                secure: true, 
                sameSite: 'strict',
                expires: 60 * 60 * 24 * 7
            }
        );
        Cookies.set(
            'refreshToken', 
            data.refreshToken, 
            { 
                path: '/', 
                secure: true, 
                sameSite: 'strict',
                expires: 60 * 60 * 24 * 7
            }
        );
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`error`);
    }
}

export const logout = async() => {
    try {
        const token = Cookies.get('accessToken');
        const response = await fetch(`${baseUrl}/auth/logout`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<any> = await response.json();
        const data: any = parseResponse.data;
        console.log(data);
        clearCookies();
        return data;
    } catch (error) {
        throw new Error('Error');
    }
}

export const sendCode = async (email: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/sendCode`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email: email}),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const parseResponse: DataApiResponse<any> = await response.json();
        // const data: any = parseResponse.data;
        // return data;
    } catch (error) {
        throw new Error(`HTTP error`);
    }
}

export const verifyCode = async(dto: VerifyCodeDto) => {
    try {
        const response = await fetch(`${baseUrl}/auth/verifyCode`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dto),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<any> = await response.json();
        const data: any = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error('send code error');
    }
}

export const changePassword = async (dto: ChangePasswordDto) => {
    try {
        const token = Cookies.get('accessToken');
        console.log(token);
        const response = await fetch(`${baseUrl}/auth/updatePassword`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dto),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<any> = await response.json();
        const data: any = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error(`HTTP error`);
    }
}

export const forgotPassword = async (dto: ForgotPasswordDto) => {
    try {
        const response = await fetch(`${baseUrl}/auth/updatePasswordByCode`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dto),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<any> = await response.json();
        const data: any = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }
}

const clearCookies = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
  
    console.log('Cookies đã bị xóa');
};