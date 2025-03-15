import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Post)
  posts?: Post[];

  @Field(() => User)
  author: User;

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date;
}
