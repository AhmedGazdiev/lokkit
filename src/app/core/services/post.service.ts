import {Injectable} from '@angular/core';
import {Post} from '../models/post';
import {postsData} from '../postsData';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts: Post[] = postsData;
  public post!: Post | undefined;

  createPost(data: any) {
    console.log(data)
  }

  getPosts() {
    this.posts = postsData;
  }

  getPostById(id: number) {
    this.post = this.posts.find((post) => post._id === id);
    return this.post;
  }

  likePost(id: number) {
    const postId = this.getPostById(id);
    if (postId !== undefined) {
      postId.likes++;
    }
    return postId;
  }
}
