
import { fetchUserPost } from '@/lib/actions/postAction'
import React from 'react'
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import NoPost from './_components/NoPost';
import PostList from './_components/PostList';
type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function UserPost({ searchParams }: Props) {
    const { page } = await searchParams;
    const {totalPosts, posts} = await fetchUserPost({
        page: page ? +page : 1,
        pageSize: DEFAULT_PAGE_SIZE,
    })
  return (
    <div>
      {!posts || !posts.length ? (
        <NoPost />
      ) : (
        <PostList
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
        />
      )}
    </div>
  )
}
