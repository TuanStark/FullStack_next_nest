import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  // @Field()
  // slug: string;

  @Field(() => [Post])
  posts?: Post[];

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date;
}
