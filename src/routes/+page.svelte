<script lang="ts">
  import { resolve } from "$app/paths";
  import Seo from "$lib/Seo.svelte";
</script>

<Seo />

<p>
  Hi there, welcome to my cosy abode atop the interconnected web!<br />Please enjoy my little blog
  posts below, or <a href={resolve("/about")}>read more about me.</a>
</p>

<hr />

<ol role="list" reversed class="article-list flow">
  <li>
    <h2>
      <a href="#" class="article-link">So cool!</a>
    </h2>
    <time datetime="2026-03-01">1 March 2026</time>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium beatae blanditiis
      consequuntur doloribus est, fugiat nihil nostrum odio quaerat quis quod sint voluptates
      voluptatum. Animi at corporis cupiditate eos explicabo.
    </p>
  </li>

  <li>
    <h2>
      <a href="#" class="article-link"
        >Hello world this is a test of a very long post title i gotta test this sorry</a
      >
    </h2>
    <time datetime="2026-02-01">1 February 2026</time>
    <p>bla bla bla</p>
  </li>
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

        font-style: italic;
        color: light-dark(var(--c-l-grey-11), var(--c-d-grey-11));
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
