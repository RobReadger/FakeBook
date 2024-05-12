import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../models/Post';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  @Input() posts: Post[] = [];

  constructor(private postService: PostService) {}

  deletePost(id: string) {
    this.postService.delete(id);
  }

  editPost(post: Post) {
    this.postService.update(post);
  }
}
