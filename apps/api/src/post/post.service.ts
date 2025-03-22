import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  
  constructor(private prisma: PrismaService) { }

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE
  }: {
    skip?: number,
    take?: number
  }) {
    return await this.prisma.post.findMany(
      {
        skip,
        take,
      }
    );
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst(
      {
        where: {
          id
        },
        include: {
          author: true,
          tags: true
        }

      }
    );
  }

  async findByUser({
    userId,
    skip,
    take
  }: {
    userId: number,
    skip?: number,
    take?: number
  }) {
    return await this.prisma.post.findMany({
      where:{
        author:{
          id: userId,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      take,
      skip,
    })
  }


  userPostCount(userId: number) {
    return this.prisma.post.count({
      where: {
        authorId: userId,
      },
    });
  }


  async create({ 
    createPostInput, 
    authorId 
  }: { 
    createPostInput: CreatePostInput; 
    authorId: number 
  }) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags:{
          connectOrCreate:createPostInput.tags.map(tag => ({
            where:{name: tag},
            create:{name: tag}
          }))
        }
      },
    });
  }

  async update({
    userId,
    updatePostInput
  }:{
    updatePostInput: UpdatePostInput,
    userId: number
  }) {
    const authorMatcher = await this.prisma.post.findUnique({
      where:{
        id: updatePostInput.postId,
        authorId: userId,
      }
    });

    if(!authorMatcher) throw new UnauthorizedException();

    return await this.prisma.post.update({
      where:{
        id: updatePostInput.postId,
      },
      data:{
        ...updatePostInput,
        tags:{
          set:[],
          connectOrCreate:(updatePostInput.tags ?? []).map((tag) => ({
            where:{name: tag},
            create:{name: tag}
          }))
        }
      }
    })
  }
}
