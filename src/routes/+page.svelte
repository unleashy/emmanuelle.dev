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

<ul class="fancy-list">
  <li><a href={resolve("/about")}>Read more about me</a></li>
  <li><a href={resolve("/colophon")}>See how I made this website</a></li>
</ul>

<hr />

<ol role="list" reversed class="article-list flow">
  {#each data.posts as post (post.slug)}
    <li>
      <div class="article-title">
        <h2>
          <a href={resolve(`/posts/${post.slug}`)} class="article-link">
            <span>{post.title}</span>
          </a>
        </h2>
        <div class="time">
          <PostDate date={post.date} />
        </div>
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-title {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;

    flex-direction: column;

    @container (width >= 35ch) {
      align-items: baseline;
      flex-direction: row;
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

    &:active {
      background: none;

      & > * {
        background: var(--c-link-fg);
        color: var(--c-link-fg-active);
        text-decoration: none;
      }
    }
  }
</style>
