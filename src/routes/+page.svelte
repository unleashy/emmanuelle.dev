<script lang="ts">
  import { resolve } from "$app/paths";
  import Seo from "$lib/Seo.svelte";
  import PostDate from "$lib/PostDate.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Seo />

<p>
  Hi there, welcome to my abode atop the interconnected web! Please enjoy my little blog posts
  below. Or:
</p>

<ul role="list" class="fancy-list">
  <li><a href={resolve("/about")}>Read more about me!</a></li>
  <li><a href={resolve("/ask")}>Ask me something or draw me a cute picture!</a></li>
</ul>

<hr />

<ol role="list" reversed class="article-list flow">
  {#each data.posts as post (post.slug)}
    <li>
      <h2>
        <a href={resolve(`/posts/${post.slug}`)} class="article-link">{post.title}</a>
      </h2>
      <div class="time">
        <PostDate date={post.date} />
      </div>
      <p>{post.summary}</p>
    </li>
  {/each}
</ol>

<style>
  .article-list {
    --flow-gap: 2rem;
  }

  .article-list {
    container-type: inline-size;
    list-style: none;
    padding-inline-start: 0;

    & > * {
      --flow-gap: 2.5rem;
    }
  }

  .article-list > * {
    display: grid;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    align-items: center;

    @container (width >= 35ch) {
      grid-template-columns: 1fr auto;
      grid-template-areas:
        "title time"
        "desc  desc";

      & > .time {
        justify-self: flex-end;
      }

      & > p {
        grid-area: desc;
      }
    }
  }

  .article-link {
    display: block;
    text-align: left;
    line-height: 1.1;

    &:not(:hover, :focus) {
      text-decoration: none;
      color: inherit;
    }

    &:hover,
    &:focus {
      color: var(--c-link-fg);
    }
  }
</style>
