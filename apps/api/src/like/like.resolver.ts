import { Args, Context, Mutation, Resolver, Int } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';


@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.likePost({ postId, userId });
  }

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => Boolean)
  // async unLikePost(
  //   @Context() context,
  //   @Args('postId', { type: () => Int! }) postId: number,
  // ) {
  //   const userId = context.req.user.id;
  //   return await this.likeService.unlikePost({ postId, userId });
  // }
  
}
