import { Render } from '@9gustin/react-notion-render';
import { DateTime } from 'luxon';
import type { NotionBlock } from '@9gustin/react-notion-render';

import { getPost, getPosts } from '@/lib/notion';
import './notion.css';

export async function generateMetadata({
  params
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await getPost(slug);

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
  }
}

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
      <div className="pb-6">
        <h1>{post.title}</h1>
        <div className="flex justify-between">
          <time dateTime={post.date}>
            {DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_FULL)}
          </time>
          <div className="space-x-2">
            {post.tags.map(t => {
              return (
                <span
                  key={t.id}
                  className="p-1 rounded-md opacity-60 text-background"
                  style={{ backgroundColor: t.color }}
                >
                  {`#${t.name}`}
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <Render
        blocks={blocks as NotionBlock[]}
        classNames
      />
    </div>
  );
}
