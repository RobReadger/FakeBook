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

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.userService
      .getById(this.post.authorId)
      .subscribe((user) => (this.username = user.data()?.name));
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
}
