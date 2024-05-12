import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        this.userService.getById(cred.user?.uid!).subscribe((user) => {
          localStorage.setItem('user', JSON.stringify(user.data()));
          this.router.navigate(['feed']);
        });
      });
  }

  logout() {
    this.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  register(user: User) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((cred) => {
        user.uid = cred.user?.uid!;

        this.userService
          .create(user)
          .then((_) => {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['feed']);
          })
          .catch((err) => console.log(err));
      });
  }
}
