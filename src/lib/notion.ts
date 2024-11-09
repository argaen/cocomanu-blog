import { Client } from "@notionhq/client";
import type { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: '139452d3e01380969e3edd1c8b5ca44a',
    filter: {
      property: 'Post Status',
      status: {
        equals: 'Done',
      },
    },
  });
  const results = response.results as DatabaseObjectResponse[];

  return results.map((page) => ({
    id: page.id,
    title: page.properties['Name'].title[0].plain_text,
    date: page.properties['Published Date'].date.start,
    summary: page.properties['Summary'].rich_text[0].plain_text,
    slug: page.properties['Slug'].formula.string,
    image: page.properties['Featured Image'].files[0].external.url,
    reading: page.properties['Reading Time'].number,
  }));
}

export async function getPost(slug: string) {
  const response = await notion.databases.query({
    database_id: '139452d3e01380969e3edd1c8b5ca44a',
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0];

  const blocks = await notion.blocks.children.list({ block_id: page.id });

  return {
    post: {
      id: page.id,
      title: page.properties['Name'].title[0].plain_text,
      date: page.properties['Published Date'].date.start,
      summary: page.properties['Summary'].rich_text[0].plain_text,
      slug: page.properties['Slug'].formula.string,
      image: page.properties['Featured Image'].files[0].external.url,
      reading: page.properties['Reading Time'].number,
    },
    blocks: blocks.results,
  };
}
