import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostsStore } from './../../services/posts.store';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isProcessingRequest: boolean;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private postsStore: PostsStore) { }

  ngOnInit() {
    this.initializePostForm();
  }

  /**
   * Clear input form
   */
  clearForm(): void {
    this.postForm.reset();
  }

  /**
   * Initialize post form
   */
  initializePostForm(): void {
    this.postForm = new FormGroup({
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
   * Save post
   */
  onSubmit(): void {
    if (this.postForm.valid) {
      const post = this.postForm.value;
      this.isProcessingRequest = true;
      this.postsStore.addPost(post).subscribe(res => {
        this.router.navigate(['/']);
        this.isProcessingRequest = false;
      });
    }
  }
}
