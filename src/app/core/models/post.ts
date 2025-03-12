export interface Post {
    id: number;
    authorId: number;
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
    authorId: number;
    content: string;
    date: string;
}
