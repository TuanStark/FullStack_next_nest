import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // no se tao file schema.gql o thu muc src/graphql
    autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
  }), 
  PostModule, 
  UserModule, 
  CommentModule, 
  TagModule, 
  LikeModule, 
  AuthModule,
  ConfigModule.forRoot({
    isGlobal: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
