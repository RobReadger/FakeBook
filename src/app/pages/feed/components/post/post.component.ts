import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Post } from '../../../../models/Post';
import { UserService } from '../../../../services/user.service';
import { FormControl } from '@angular/forms';
import { CommentService } from '../../../../services/comment.service';
import { Comment } from '../../../../models/Comment';
import { map } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements AfterViewInit {
  @Input({ required: true }) post!: Post;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<Post>();
  isEditing = false;
  contentControl = new FormControl();
  username?: string;

  isCommenting = false;
  commentControl = new FormControl();

  isCommentEditing = false;
  commentEditControl = new FormControl();

  comments: Comment[] = [];

  constructor(
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngAfterViewInit(): void {
    this.getNameById(this.post.authorId).subscribe(
      (name) => (this.username = name)
    );
    this.commentService
      .getCommentsForPost(this.post.id)
      .subscribe((comments) => (this.comments = comments));
  }

  isAuthor() {
    return this.post.authorId === this.userService.getCurrentUser()?.uid;
  }

  edit() {
    if (!this.isEditing) {
      this.isEditing = true;
      this.contentControl.setValue(this.post.content);
      return;
    }

    this.isEditing = false;
    this.post.content = this.contentControl.value;
    this.editEvent.emit(this.post);
  }

  getNameById(userId: string) {
    return this.userService
      .getById(userId)
      .pipe(map((user) => user.data()?.name));
  }

  comment() {
    if (!this.isCommenting) {
      this.isCommenting = true;
      return;
    }

    this.isCommenting = false;
    const comment = {
      authorName: this.userService.getCurrentUser()?.name,
      authorId: this.userService.getCurrentUser()?.uid!,
      postId: this.post.id,
      content: this.commentControl.value,
    } as Comment;
    this.commentService.create(comment);
  }

  isCommentAuthor(userId: string) {
    return this.userService.getCurrentUser()?.uid === userId;
  }

  deleteComment(id: string) {
    this.commentService.delete(id);
  }

  editComment(comment: Comment) {
    if (!this.isCommentEditing) {
      this.isCommentEditing = true;
      this.commentEditControl.setValue(comment.content);
      return;
    }

    this.isCommentEditing = false;
    comment.content = this.commentEditControl.value;
    this.commentService.update(comment);
  }
}
