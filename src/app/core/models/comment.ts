import { User } from './user';

export interface Comment {
    likes: string[];
    _id: string;
    user: User;
    content: string;
    reply?: string;
    postUserId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
}

export interface CommentResponse {
    comment: Comment;
}
