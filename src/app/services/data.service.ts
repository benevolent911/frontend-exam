import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Post } from './../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * @param post
   * Adds new post
   */
  createPost(post: Post): Observable<Post> {
    return this.http.post(environment.api.postsUrl, post)
      .pipe(
        map((post: Post) => post),
        catchError(error => throwError('Post creation failed.')),
        shareReplay());
  }

  /**
   * @param postId
   * Deletes a post
   */
  deletePost(postId: number): Observable<any> {
    return this.http.delete(environment.api.postsUrl + postId)
      .pipe(
        map((res: any) => res),
        catchError(error => throwError('Post deletion failed.')),
        shareReplay());
  }

  /**
   * Load all posts
   */
  loadPosts(): Observable<Post[]> {
    return this.http.get(environment.api.postsUrl)
      .pipe(
        map((posts: Post[]) => posts),
        catchError(error => throwError('Posts fetching failed.')),
        shareReplay());
  }

  /**
   * @param post
   * Update a post
   */
  savePost(post: any): Observable<Post> {
    return this.http.put(environment.api.postsUrl + post.id, post)
      .pipe(
        map((post: Post) => post),
        catchError(error => throwError('Post update failed.')),
        shareReplay());
  }
}
