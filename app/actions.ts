'use server';
import { revalidatePath } from "next/cache";
import { prisma } from "./lib/db";
import { v4 as uuidv4 } from 'uuid';
let dynamic = 'force-dynamic'

export const addPost = async (formData: FormData): Promise<void> => {
    if (!formData) {
        throw new Error('formData must not be null or undefined');
    }
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const generatedAuthorId = uuidv4();
    const authorId = generatedAuthorId;
    if (!authorId) {
        throw new Error('authorId must not be null or undefined');
    }

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
        console.log('Post added successfully:', post);
        revalidatePath('/posts');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to add post: ${error.message}`);
        } else {
            throw new Error('Failed to add post: Unknown error');
        }
    } finally {
        await prisma.$disconnect();
    }
};

export const getPosts = async () => {
    try {
        return await prisma.post.findMany();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch posts: ${error.message}`);
        } else {
            throw new Error('Failed to fetch posts: Unknown error');
        }
    } finally {
        await prisma.$disconnect();
    }
};

export async function deletePost(formData: FormData): Promise<void> {
    if (!formData) {
        throw new Error('formData must not be null or undefined');
    }
    const id = formData.get('id') as string;
    if (!id) {
        throw new Error('id must not be null or undefined');
    }
    console.log('Deleting post with id:', id);

    const post = await prisma.post.findUnique({
        where: { id: id },
    });

    if (!post) {
        throw new Error(`Post with id ${id} does not exist`);
    }

    await prisma.post.delete({
        where: { id: id },
    });

    revalidatePath('/posts');
}