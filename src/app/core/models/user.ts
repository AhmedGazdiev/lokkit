export interface User {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password?: string;
    avatar: string;
    gender: UserGender;
    role: UserRole;
    joined?: Date;
    city: string;
    story: string;
}

type UserGender = 'male' | 'female';
type UserRole = 'admin' | 'user';
