import { User } from './User';
import { Comment } from './Comment';

export interface Post {
  author: User;
  content: string;
  likes: number;
  comments: Comment[];
}
