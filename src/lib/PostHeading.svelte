<script lang="ts">
  import { Temporal } from "temporal-polyfill-lite";
  import Seo from "$lib/Seo.svelte";
  import PostDate from "$lib/PostDate.svelte";

  interface Props {
    title: string;
    summary: string;
    date: string;
  }

  let { title, summary, date }: Props = $props();
</script>

<Seo {title} description={summary} />

<emma-container>
  <emma-post-header>
    <h1>{title}</h1>
    <PostDate date={Temporal.PlainDate.from(date)} />
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
</style>
