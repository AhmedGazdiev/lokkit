import { User } from './user';

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
