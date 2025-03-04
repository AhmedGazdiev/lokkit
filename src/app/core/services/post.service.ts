import { Injectable } from '@angular/core';
import { postsData } from '../postsData';
import { Post } from '@core/models/post';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    public posts: Post[] = postsData;
    public post!: Post | undefined;

    public createPost(data: any) {
        console.log(data);
    }

    public getPosts() {
        this.posts = postsData;
    }

    public getPostById(id: number) {
        this.post = this.posts.find(post => post._id === id);
        return this.post;
    }

    public likePost(id: number) {
        const postId = this.getPostById(id);
        if (postId !== undefined) {
            postId.likes++;
        }
        return postId;
    }

    public updatePost(data: any) {
        console.log('This post has been edited:', data);
    }

    public deletePost() {
        console.log('this Post has been deleted');
    }
}
