import {Injectable} from '@angular/core';
import {Post} from '../models/post';
import {postsData} from '../postsData';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts: Post[] = postsData;
  public post!: Post | undefined;

  public createPost(data: any) {
    console.log(data)
  }

  public getPosts() {
    this.posts = postsData;
  }

  public getPostById(id: number) {
    this.post = this.posts.find((post) => post._id === id);
    return this.post;
  }

  public likePost(id: number) {
    const postId = this.getPostById(id);
    if (postId !== undefined) {
      postId.likes++;
    }
    return postId;
  }

  public deletePost() {
    console.log('this Post has been deleted')
  }
}
