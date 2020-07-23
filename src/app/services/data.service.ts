import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { clone } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

import { Post } from './../shared/models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private posts$: BehaviorSubject<Post[] | any>;
  private api = environment.api.postsUrl;
  posts: Array<Post> = new Array<Post>();

  constructor(private http: HttpClient) {
    this.posts$ = new BehaviorSubject([]);
  }

  createPost(post) {
    return this.http.post(this.api, post)
    .pipe(
      map((res: any) => res),
      catchError(error => throwError('Post creation failed.')));
  }

  deletePost(post) {
    return this.http.delete(this.api + post.id)
    .pipe(
      map((res: any) => res),
      catchError(error => throwError('Post deletion failed.')));
  }

  initPosts(): Observable<Post[]> {
    return this.http.get(this.api)
            .pipe(
              map((res: any) => res),
              catchError(error => throwError('Posts fetching failed.')));
  }

  getPost(postId: number) {
    return of(this.posts$.getValue().find(post => post.id === postId));
  }

  getPosts(): Post[] {
    return clone(this.posts$.getValue());
  }

  savePost(post) {
    return this.http.put(this.api + post.id, post)
            .pipe(
              map((res: any) => res),
              catchError(error => throwError('Post update failed')));
  }

  storePost(posts: Post[]): void {
    this.posts$.next(posts);
  }

}
