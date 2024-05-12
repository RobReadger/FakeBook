import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { Comment } from '../models/Comment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}

  fetchPosts(): Observable<Post[]> {
    return of([
      {
        author: undefined as unknown as User,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        likes: 31,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        likes: 42,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        likes: 25,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        likes: 18,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        likes: 37,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
        likes: 50,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
        likes: 23,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
        likes: 29,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content:
          'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
        likes: 36,
        comments: [] as Comment[],
      } as Post,
      {
        author: undefined as unknown as User,
        content: 'Curabitur blandit tempus porttitor.',
        likes: 44,
        comments: [] as Comment[],
      } as Post,
    ]);
  }
}
