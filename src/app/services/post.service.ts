import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { Observable, of, switchMap } from 'rxjs';
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
      .collection<Post>('posts', (ref) => ref.where('authorId', '==', id))
      .valueChanges();
  }

  update(post: Post) {
    this.firestore.collection('posts').doc(post.id).update(post);
  }

  deleteAllPostsOfUser(userId: string) {
    this.firestore
      .collection<Post>('posts', (ref) => ref.where('authorId', '==', userId))
      .get()
      .pipe(
        switchMap((snapshot) => {
          const batch = this.firestore.firestore.batch();
          snapshot.docs.forEach((doc) => batch.delete(doc.ref));
          return batch.commit();
        })
      );
  }
}
