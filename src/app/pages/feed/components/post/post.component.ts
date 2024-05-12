import { Component, Input } from '@angular/core';
import { Post } from '../../../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input({ required: true }) post!: Post;
}
