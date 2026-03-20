import fs from "node:fs/promises";
import path from "node:path";
import { Temporal } from "temporal-polyfill-lite";
import type { RouteId } from "$app/types";
import type { PageServerLoad } from "./$types";

type PostSlug<T> = T extends `/posts/${infer Slug}` ? Slug : never;

interface Post {
  slug: PostSlug<RouteId>;
  title: string;
  date: Temporal.PlainDate;
  summary: string;
}

export const load: PageServerLoad = async () => ({ posts: await loadPosts() });

const POSTS_PATH = path.join(process.cwd(), "src", "routes", "posts");

async function loadPosts(): Promise<Post[]> {
  let posts = [];

  let postsDir = await fs.opendir(POSTS_PATH, { recursive: false });
  for await (let dir of postsDir) {
    if (!dir.isDirectory()) continue;

    let route = path.join(dir.parentPath, dir.name, "+page.svelte");
    let content = await fs.readFile(route, { encoding: "utf8" });

    let seo = content.match(
      /<PostHeading\s*title="(.*?)"\s*summary="(.*?)"\s*date="(.*?)"\s*\/>/su,
    );
    if (!seo) {
      throw new Error(`could not find PostHeading tag for '${dir.name}'`);
    }

    let title = seo[1];
    let summary = seo[2];
    let date = seo[3];

    posts.push({
      slug: dir.name as PostSlug<RouteId>,
      title,
      date: Temporal.PlainDate.from(date),
      summary,
    } satisfies Post);
  }

  return posts;
}
