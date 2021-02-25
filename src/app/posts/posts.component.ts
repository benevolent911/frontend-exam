import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from './../shared/models/post.model';
import { PostsStore } from '../services/posts.store';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(public router: Router,
              private postsStore: PostsStore) {              
  }

  ngOnInit() {
    this.posts$ = this.postsStore.getPosts();
  }

  editPost(post: Post): void {
    this.router.navigate([`/posts/${post.id}`, 'edit']);
  }
}
