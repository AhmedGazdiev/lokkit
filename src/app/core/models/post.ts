import { ImageUpload } from '@core/services/upload-images.service';
import { User } from './user';

export interface Post {
    images: ImageUpload[];
    likes: User[];
    comments: Comment[];
    _id: string;
    content: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: 0;
}

interface Comment {
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

export interface PostResponse {
    msg: string;
    post: Post;
}

export interface GetPostsResponse {
    msg: string;
    result: number;
    posts: Post[];
}
