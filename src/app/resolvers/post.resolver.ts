import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { Post } from './../shared/models/post.model';
import { PostsStore } from './../services/posts.store';

@Injectable()
export class PostResolver implements Resolve<Post> {

  constructor(public router: Router,
              private postsStore: PostsStore) {}

  resolve(): Observable<any> {
    return Observable.create(observer => {
      this.postsStore.getPosts().subscribe(posts => {
        if (posts.length > 0) {
          observer.next(null);
          observer.complete();
        }
      });
    })
  }
}
