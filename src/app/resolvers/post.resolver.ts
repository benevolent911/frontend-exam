import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { DataService } from './../services/data.service';
import { Post } from './../shared/models/post.model';

@Injectable()
export class PostResolver implements Resolve<Post> {

  constructor(public router: Router,
              private dataService: DataService) {}

  resolve(): Observable<any> {
    return Observable.create(observer => {
      this.dataService.initPosts()
          .subscribe((posts: Post[]) => {
            this.dataService.storePost(posts);
            observer.next(null);
            observer.complete();
          });
    })
  }
}
