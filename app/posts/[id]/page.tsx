'use server';
import { prisma } from '@/app/lib/db';
import React from 'react';
import styles from './PostIdPage.module.css';


const PostIdPage = async ({ params }: { params: { id: string } }) => {
  // You don't need to await the context here
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id: id },
  });

  return (
    <div className={styles.container}>
      {post ? (
        <div>
          <h1 className={styles.title}>Post Details</h1>
          <div className={styles.detail}>
            <strong className={styles.label}>Title:</strong>
            <span className={styles.value}>{post.title}</span>
          </div>
          <div className={styles.detail}>
            <strong className={styles.label}>Content:</strong>
            <span className={styles.value}>{post.content}</span>
          </div>
        </div>
      ) : (
        <div className={styles.notFound}>Post not found</div>
      )}
    </div>
  );
};

export default PostIdPage;
