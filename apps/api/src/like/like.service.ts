import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class LikeService {
    constructor(private readonly prisma: PrismaService) { }

    async likePost({
        postId,
        userId
    }: {
        postId: number;
        userId: number
    }) {
        try {
            return !!(await this.prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            }));
        } catch (err) {
            throw new BadRequestException('You have already liked this post');
        }
    }

    // async unlikePost({ postId, userId }: { postId: number; userId: number }) {
    //     try {
    //       await this.prisma.like.delete({
    //         where: {
    //           userId: {
    //             userId
    //           },
    //         },
    //       });
    //       return true;
    //     } catch (err) {
    //       throw new BadRequestException('Like not found');
    //     }
    //   }
}
