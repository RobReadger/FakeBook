import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  create(user: User) {
    return this.firestore.collection<User>('users').doc(user.uid).set(user);
  }

  getById(id: string) {
    return this.firestore.collection<User>('users').doc(id).get();
  }

  update(user: User) {
    return this.firestore.collection<User>('users').doc(user.uid).update(user);
  }

  delete(id: string) {
    return this.firestore.collection<User>('users').doc(id).delete();
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');

    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}
