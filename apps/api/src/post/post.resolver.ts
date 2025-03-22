import { Resolver, Query, Context, Args, Int, Mutation } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  //@UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(@Context() context,
    @Args("skip", { nullable: true }) skip?: number,
    @Args("take", { nullable: true }) take?: number
  ) {
    console.log(context.req.user);
    console.log("success");
    return this.postService.findAll({ skip, take });
  }

  // cai nay co the ket hop 2 cau query lai voi nhau
  @Query(() => Int, { name: 'postCount' })
  // cai dau la kieu tra ve, cai thu 2 la ten cua cau query
  count() {
    return this.postService.count();
  }

  @Query(() => Post)
  getPostById(@Args("id", { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  getUserPosts(@Context() context,
    @Args("skip", { nullable: true, type:() => Int }) skip?: number,
    @Args("take", { nullable: true, type:() => Int }) take?: number
  ) {
    // cai context de lay thong tin tu token tren headers
    const userId = context.req.user.id;
    return this.postService.findByUser({
      userId,
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE
    })
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int)
  userPostCount(@Context() context,){
    const userId = context.req.user.id;
    return this.postService.userPostCount(userId );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Context() context,
    @Args("createPostInput") createPostInput: CreatePostInput
  ){
    const authorId = context.req.user.id;
    return this.postService.create({createPostInput, authorId});
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @Context() context,
    @Args("updatePostInput") updatePostInput: UpdatePostInput
  ){
    const userId = context.req.user.id;
    return this.postService.update({updatePostInput, userId});
  }
}
