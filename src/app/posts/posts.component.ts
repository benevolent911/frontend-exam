import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DataService } from './../services/data.service';
import { Post } from './../shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(public router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.posts = this.dataService.getPosts();
  }

  editPost(post: Post) {
    this.router.navigate([`/posts/${post.id}`, 'edit']);
  }

  storeNewPost(post: Post): void {
    this.posts.push(post);
    this.dataService.storePost(this.posts);
  }
}
