import { Post } from './Post';
import { User } from './User';

export interface Comment {
  author: User;
  post: Post;
  content: string;
}
