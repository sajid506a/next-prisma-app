'use server';
import { prisma } from '@/app/lib/db';
import React from 'react';

interface Params {
  id: string;
}

const PostIdPage = async ({
  params
}: { params: Params }) => {
  const awaitedParams = params;
  const post = await prisma.post.findUnique({
    where: { id: awaitedParams.id }
  });
  return (
    <div> 
        {post ? post.title : 'Post not found'}
    </div>
  )
}

export default PostIdPage