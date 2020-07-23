import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from './../../services/data.service';
import { Post } from './../../shared/models/post.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  isProcessingRequest: boolean;
  post: Post;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.initializePostForm();
  }

  clearForm(): void {
    this.postForm.reset();
  }

  initializePostForm(): void {
    this.postForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'title': new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z].*[\s\.]*$')]),
      'body': new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  onMain(): void {
    this.router.navigate(['/posts/']);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.isProcessingRequest = true;
      this.dataService.createPost(this.postForm.value).subscribe(res => {
        this.router.navigate(['/posts/']);
        this.isProcessingRequest = false;
      });
    }
  }
}
