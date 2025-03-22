import { Post } from '@/lib/types/modelTypes'
import React from 'react'
import  PostListItem from './PostListItem';
import Pagination from '@/components/pagination';

type Props = {
  posts: Post[],
  currentPage: number;
  totalPages: number;
}
export default function PostList({ posts, currentPage, totalPages}: Props) {
  return (
   <>
    <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-2"></div>
        <div></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      
      <Pagination {...{currentPage, totalPages}} className='my-4'/>
   </>
  )
}
