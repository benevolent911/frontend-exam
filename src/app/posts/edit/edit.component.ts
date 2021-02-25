import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostsStore } from './../../services/posts.store';
import { Post } from './../../shared/models/post.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isProcessingRequest: boolean;
  postForm: FormGroup;
  post$: Observable<Post>;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private postsStore: PostsStore) { }

  ngOnInit() {    
    this.getPost();
  }

  /**
   * Clear input form
   */
  clearForm(): void {
    this.postForm.reset();
  }

  /**
   * @param post
   * Deletes a post
   */
  deletePost(post: Post): void {
    this.isProcessingRequest = true;
    this.postsStore.deletePost(post.id).subscribe(res => {
      this.router.navigate(['/']);
      this.isProcessingRequest = false;
    });
  }

  /**
   * Get post
   */
  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post$ = this.postsStore.getPosts().pipe(
      map(posts => {
        const post = posts.find(post => post.id === id);
        if (!post) {
          this.router.navigate(['/']);
        } else {
          this.initializePostForm();
          this.postForm.patchValue(post);
        }
        return post;
      })
    );
  }

  /**
   * Initialize post form
   */
  initializePostForm(): void {
    this.postForm = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'body': new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  /**
   * Back to main page
   */
  onMain(): void {
    this.router.navigate(['/']);
  }

  /**
   * @param post
   * Save post
   */
  onSubmit(post: Post): void {
    if (this.postForm.valid) {
      this.isProcessingRequest = true;
      this.postsStore.savePost(post.id, this.postForm.value).subscribe(res => {
        this.router.navigate(['/']);
        this.isProcessingRequest = false;
      });
    }
  }
}
