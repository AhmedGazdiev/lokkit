export interface User {
    _id: number;
    fullName: string;
    username: string;
    email: string;
    password?: string;
    avatar: string;
    gender: UserGender;
    role: UserRole;
    joined?: Date;
}

type UserGender = 'male' | 'female';
type UserRole = 'admin' | 'user';
