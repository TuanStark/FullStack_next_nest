import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../../comment/entities/comment.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  thumbnail: string;

  @Field()
  content: string;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  author: User

  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => [Comment])
  comments: Comment[];
}
