import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FeedRoutingModule } from './feed-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderModule } from '../../components/header/header.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedComponent, PostsComponent, PostComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderModule,
    ReactiveFormsModule,
  ],
  exports: [PostsComponent],
})
export class FeedModule {}
