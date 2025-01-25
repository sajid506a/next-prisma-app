'use server';
import Link from 'next/link';
import { getPosts, addPost, deletePost } from '../actions';
import { revalidatePath } from 'next/cache';

const PostPage = async () => {
  const posts = await getPosts();

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Content
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/posts/${post.id}`} className="text-indigo-600 hover:text-indigo-900">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {post.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add New Post</h2>
        <form action={addPost} className="space-y-4 p-4 border rounded-md shadow-md">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input type="text" name="title" id="title" className="mt-1 block w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">Content</label>
            <input type="text" name="content" id="content" className="mt-1 block w-full p-2 border rounded-md" />
          </div>
          <div>
            <button type="submit" className="py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PostPage