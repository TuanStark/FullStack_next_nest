import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { Query, Int } from '@nestjs/graphql';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { CreateCommentInput } from './dto/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';


@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @Query(() => [Comment])
  getPostComments(@Args('postId', { type: () => Int! }) postId: number,
    @Args('take', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_PAGE_SIZE,
    })
    take: number,
    @Args('skip', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
    })
    skip: number,
  ) {
    return this.commentService.findOneByPost({ postId, take, skip });
  }

  @Query(() => Int)
  postCommentCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.commentService.count(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Context() Context,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId = Context.req.user.id;
    return this.commentService.create(createCommentInput, authorId);
  }
}
