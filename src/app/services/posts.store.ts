import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { Post } from './../shared/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsStore {

  private subject = new BehaviorSubject<Post[]>([]);
  posts$: Observable<Post[]> = this.subject.asObservable();

  constructor(private dataService: DataService) {
              this.loadPosts();
  }

  /**
   * @param post
   * Adds new post
   */
  addPost(post: Post): Observable<any> {    
    return this.dataService.createPost(post).pipe(
      tap(res => {
        const posts = this.subject.getValue();
        const newPosts = [...posts, res];

        this.subject.next(newPosts);
      })
    );
  }

  /**
   * @param postId
   * Deletes a post
   */
  deletePost(postId: number): Observable<any> {
    const posts = this.subject.getValue();
    const newPosts = posts.filter(post => post.id !== postId);

    this.subject.next(newPosts);

    return this.dataService.deletePost(postId);
  }

  /**
   * Load all posts
   */
  loadPosts(): void {
    this.dataService.loadPosts().pipe(
      tap(posts => this.subject.next(posts))).subscribe();
  }

  /**
   * Get all posts
   */
  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  /**
   * Get post by id
   */
  getPost(postId: number): Observable<Post> {
    return this.posts$.pipe(
      map(posts => posts.find(post => post.id === postId))
    );
  }

  /**
   * @param postId
   * @param changes
   * Update post
   */
  savePost(postId: number, changes: Partial<Post>): Observable<any> {
    const posts = this.subject.getValue();
    const postIndex = posts.findIndex(post => post.id === postId);
    const newCourse: Post = {
      ...posts[postIndex],
      ...changes
    };
    const newCourses: Post[] = posts.slice(0);
    newCourses[postIndex] = newCourse;
    
    this.subject.next(newCourses);

    return this.dataService.savePost(changes);
  }
}
