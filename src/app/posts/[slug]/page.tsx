import { Render } from '@9gustin/react-notion-render';

import { getPost, getPosts } from '@/lib/notion';
import './notion.css';

export async function generateStaticParams() {
  const posts = await getPosts();
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({
  params,
}: { params: Promise<{ slug: string }> }): Promise<JSX.Element> {
  const { slug } = await params;
  const { post, blocks } = await getPost(slug);

  return (
    <div>
      <h1>{post.title}</h1>
      <Render
        blocks={blocks}
        classNames
      />
    </div>
  );
}
