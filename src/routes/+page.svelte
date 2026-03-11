<script lang="ts">
  import { resolve } from "$app/paths";
  import Seo from "$lib/Seo.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<Seo />

<p>
  Hi there, welcome to my cosy abode atop the interconnected web!<br />Please enjoy my little blog
  posts below, or <a href={resolve("/about")}>read more about me.</a>
</p>

<hr />

<ol role="list" reversed class="article-list flow">
  {#each data.posts as post (post.slug)}
    <li>
      <h2>
        <a href={resolve(`/posts/${post.slug}`)} class="article-link">{post.title}</a>
      </h2>
      <time datetime={post.date.toJSON()} class="text-slight"
        >{post.date.toLocaleString("en-GB", { dateStyle: "long" })}</time
      >
      <p>{post.summary}</p>
    </li>
  {/each}
</ol>

<style>
  hr,
  .article-list {
    --flow-gap: 2rem;
  }

  .article-list {
    container-type: inline-size;
    list-style: none;

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

      & > time {
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
