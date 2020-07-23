import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from './../../services/data.service';
import { Post } from './../../shared/models/post.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isProcessingRequest: boolean;
  post: Post;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.getPost();
  }

  clearForm(): void {
    this.postForm.reset();
  }

  deletePost(): void {
    this.dataService.deletePost(this.postForm.value).subscribe(res => {
      this.router.navigate(['/posts/']);
    });
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getPost(id)
      .subscribe(post => {
        this.post = post;
        this.initializePostForm();
      });
  }

  initializePostForm(): void {
    this.postForm = new FormGroup({
      'id': new FormControl(this.post.id),
      'name': new FormControl(this.post.name, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'title': new FormControl(this.post.title, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'body': new FormControl(this.post.body, [Validators.required, Validators.minLength(10)])
    });
  }

  onMain(): void {
    this.router.navigate(['/posts/']);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isProcessingRequest = true;
      this.dataService.savePost(this.postForm.value).subscribe(res => {
        this.router.navigate(['/posts/']);
        this.isProcessingRequest = false;
      });
    }
  }
}
