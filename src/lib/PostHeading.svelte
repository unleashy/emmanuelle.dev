<script lang="ts">
  import { Temporal } from "temporal-polyfill-lite";
  import Seo from "$lib/Seo.svelte";
  import PostDate from "$lib/PostDate.svelte";

  interface Props {
    title: string;
    summary: string;
    date: string;
    draft?: boolean;
  }

  let { title, summary, date, draft }: Props = $props();
</script>

<Seo {title} description={summary} />

<emma-container>
  <emma-post-header>
    <h1>{title}</h1>
    {#if draft}
      <strong class="draft-badge">Draft</strong>
    {:else}
      <PostDate date={Temporal.PlainDate.from(date)} />
    {/if}
  </emma-post-header>
</emma-container>

<style>
  emma-post-header {
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;

    flex-direction: column;

    @container (width >= 35ch) {
      align-items: baseline;
      flex-direction: row;
    }
  }

  .draft-badge {
    display: inline-block;
    align-self: start;

    padding: 1ex 1rem;
    line-height: 1;

    font-size: var(--t--1);
    letter-spacing: var(--font-sans-tracking--1);
    font-weight: var(--font-sans-weight-1);

    background: oklch(60% 0.2 250);
    color: white;

    border-radius: 1rem;

    @container (width >= 35ch) {
      align-self: center;
    }
  }
</style>
