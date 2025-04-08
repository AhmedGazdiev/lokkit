import { User } from './user';

export interface RegisterRequest {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    msg: string;
}

export interface LoginResponse {
    msg: string;
    token: string;
    user: User;
}

export interface LogoutResponse {
    msg: string;
}
