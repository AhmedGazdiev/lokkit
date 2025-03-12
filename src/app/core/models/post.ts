import { User } from './user';

export interface Post {
    id: number;
    author: User;
    title: string;
    content: string;
    image?: string;
    likes: number;
    comments: Comment[];
    date: Date;
    tags: string[];
}

export interface Comment {
    id: number;
    author: User;
    content: string;
    date: string;
}
