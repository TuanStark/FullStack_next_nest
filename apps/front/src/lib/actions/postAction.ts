"use server"

import { print } from "graphql"
import { fetchGraphql } from "../fetchGraphql"
import { GET_POST_BY_ID, GET_POSTS } from "../gqlQueries"
import { Post } from "../types/modelTypes"
import { transformTakeSkip } from "../helpers";

export const fetchPosts = async ({
    page,
    pageSize,
}: {
    page?: number;
    pageSize?: number;
}) => {
    const { skip, take } = transformTakeSkip({ page, pageSize });
    const data = await fetchGraphql(print(GET_POSTS), { skip, take });

    return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
    const data = await fetchGraphql(print(GET_POST_BY_ID), { id });

    return data.getPostById as Post;
};