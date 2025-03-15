import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  // @Field()
  // liked: boolean;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  posts: Post;

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date;
}
