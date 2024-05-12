import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { CommentService } from './comment.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  create(user: User) {
    return this.firestore.collection<User>('users').doc(user.uid).set(user);
  }

  getById(id: string) {
    return this.firestore.collection<User>('users').doc(id).get();
  }

  update(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    return this.firestore.collection<User>('users').doc(user.uid).update(user);
  }

  delete(id: string) {
    this.commentService.deleteAllCommentsOfUser(id);
    this.postService.deleteAllPostsOfUser(id);

    this.firestore.collection<User>('users').doc(id).delete();
    this.auth.signOut();
    this.auth.currentUser.then((user) => {
      if (user) {
        user.delete();
      }
    });
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}
