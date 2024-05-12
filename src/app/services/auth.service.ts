import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

  register(user: User) {
    this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((cred) => {
        user.uid = cred.user?.uid!;
        this.firestore
          .collection('users')
          .doc(user.uid)
          .set(user)
          .catch((err) => console.log(err));
      });
  }
}
