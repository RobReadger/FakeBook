import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  create(post: Post) {
    this.firestore
      .collection('posts')
      .add(post)
      .then((doc) => doc.update({ id: doc.id }));
  }

  findAllPosts() {
    return this.firestore
      .collection<Post>('posts', (ref) => ref.orderBy('postDate', 'desc'))
      .valueChanges();
  }

  getById(id: string) {
    return this.firestore.collection('posts').doc(id).get();
  }

  delete(id: string) {
    this.firestore.collection('posts').doc(id).delete();
  }

  findPostsOfUser(id: string) {
    return this.firestore
      .collection('posts', (ref) => ref.where('authorId', '==', id))
      .valueChanges();
  }

  update(post: Post) {
    this.firestore.collection('posts').doc(post.id).update(post);
  }
}
