import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from '../models/Comment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private firestore: AngularFirestore) {}

  create(comment: Comment) {
    this.firestore
      .collection('comments')
      .add(comment)
      .then((doc) => doc.update({ id: doc.id }));
  }

  update(comment: Comment) {
    this.firestore.collection('comments').doc(comment.id).update(comment);
  }

  delete(id: string) {
    this.firestore.collection('comments').doc(id).delete();
  }

  getCommentsForPost(postId: string) {
    return this.firestore
      .collection<Comment>('comments', (ref) =>
        ref.where('postId', '==', postId)
      )
      .valueChanges();
  }

  deleteAllCommentsOfUser(userId: string) {
    this.firestore
      .collection<Comment>('comments', (ref) =>
        ref.where('authorId', '==', userId)
      )
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
