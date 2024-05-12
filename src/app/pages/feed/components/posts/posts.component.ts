import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../models/Post';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    console.log('rahn');

    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.fetchPosts().subscribe((posts) => (this.posts = posts));
  }
}
