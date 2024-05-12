import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/Post';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { UserDataChangeDialogComponent } from './components/user-data-change-dialog/user-data-change-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user?: User;
  userPosts: Post[] = [];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()!;
    this.fetchUserPosts();
  }

  fetchUserPosts() {
    this.postService
      .findPostsOfUser(this.user?.uid!)
      .subscribe((posts) => (this.userPosts = posts));
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.delete(this.user?.uid!);
      }
    });
  }

  openDataChangeDialog() {
    const dialogRef = this.dialog.open(UserDataChangeDialogComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);

        this.userService.update(result);
        this.user = result;
      }
    });
  }
}
