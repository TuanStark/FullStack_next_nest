import { Resolver, Query, Context, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
//import { UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  //@UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(@Context() context,
    @Args("skip",{nullable:true}) skip?: number,
    @Args("take",{nullable:true}) take?: number
) {
    console.log(context.req.user);
    console.log("success");
    return this.postService.findAll({ skip, take });
  }

  // cai nay co the ket hop 2 cau query lai voi nhau
  @Query(() => Int, { name: 'postCount' })
  // cai dau la kieu tra ve, cai thu 2 la ten cua cau query
  count(){
    return this.postService.count();
  }

  @Query(() => Post)
  getPostById(@Args("id", {type: () => Int}) id: number){
    return this.postService.findOne(id);
  }
}
