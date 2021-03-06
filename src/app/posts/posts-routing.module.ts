import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './../shared/header/header.component';
import { PostsComponent } from './posts.component';
import { PostResolver } from '../resolvers/post.resolver';

const postsRoutes: Routes = [
  {
    path: '',
    component: PostsComponent    
  },
  {
    path: 'posts/:id/edit',
    pathMatch: 'full',
    component: EditComponent,
    resolve: {
      posts: PostResolver
    },
  },
  {
    path: 'posts/create',
    pathMatch: 'full',
    component: CreateComponent
  }
];

@NgModule({
  declarations: [
    PostsComponent,
    EditComponent,
    CreateComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forChild(postsRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [PostResolver]
})
export class PostsRoutingModule { }
