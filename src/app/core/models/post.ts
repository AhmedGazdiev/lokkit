export interface Post {
    _id: number;
    authorId: number;
    title: string;
    content: string;
    image: string;
    likes: number;
    comments: string[];
    createdAt: string;
    tags: string[];
}
