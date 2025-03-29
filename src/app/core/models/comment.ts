import { User } from './user';

export interface Comment {
    _id: string;
    content: string;
    tag?: any;
    reply?: string;
    likes: string[];
    user: User;
    postId: string;
    postUserId: string;
    createdAt: string;
    updatedAt: string;
}
