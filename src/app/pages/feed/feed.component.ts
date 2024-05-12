import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  postArea = new FormControl('', [Validators.required]);

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  createPost() {
    const user = this.userService.getCurrentUser()!;

    const post: Post = {
      id: '',
      authorId: user.uid,
      content: this.postArea.value!,
      likes: 0,
      postDate: new Date().toISOString(),
    };
    this.postService.create(post);
    this.postArea.reset();
  }
}
