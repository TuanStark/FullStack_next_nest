
import React from 'react'
import { fetchPostById } from "@/lib/actions/postAction";
import Image from "next/image";
import SanitizedContent from "./_components/SantizedComponents";
type Props = {
    params: {
        id: string
    }
}
export default async function page({ params }: Props) {
    const postId = (await params).id;
    console.log(postId);
    const post = await fetchPostById(+postId);
    return (
        <main className='container mx-auto px-4 py-8 mt-16'>
            <h1 className='text-4xl font-bold mb-4 text-slate-700'>{post.title}</h1>
            <p className='text-slate-500 text-sm mb-4'>By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className='relative w-80 h-60'>
                <Image
                    src={post.thumbnail ?? "/public/vercel.svg"}
                    alt={post.title}
                    fill
                    className='rounded-md object-cover'
                />

            </div>

            <SanitizedContent content={post.content} />
            {/*Put the  Post Comment here */}

        </main>
    )
}
