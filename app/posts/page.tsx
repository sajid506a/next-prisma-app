'use server';
import Link from 'next/link';
import { getPosts, addPost, deletePost } from '../actions';
import styles from './PostPage.module.css';

const PostPage = async () => {
  const posts = await getPosts();

  return (
    <>
      <div>
        <h2 className={styles.title}>Posts</h2>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th scope="col" className={styles.th}>
                Title
              </th>
              <th scope="col" className={styles.th}>
                Content
              </th>
              <th scope="col" className={styles.th}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {posts.map(post => (
              <tr key={post.id} className={styles.tr}>
                <td className={styles.td}>
                  <Link href={`/posts/${post.id}`} className={styles.link}>
                    {post.title}
                  </Link>
                </td>
                <td className={styles.td}>
                  {post.content}
                </td>
                <td className={styles.td}>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className={styles.deleteButton}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.addPostContainer}>
        <h2 className={styles.title}>Add New Post</h2>
        <form action={addPost} className={styles.form}>
          <div>
            <label htmlFor="title" className={styles.label}>Title</label>
            <input type="text" name="title" id="title" className={styles.input} />
          </div>
          <div>
            <label htmlFor="content" className={styles.label}>Content</label>
            <input type="text" name="content" id="content" className={styles.input} />
          </div>
          <div>
            <button type="submit" className={styles.submitButton}>
              Add Post
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PostPage