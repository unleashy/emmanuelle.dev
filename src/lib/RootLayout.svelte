<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    header: Snippet;
    children: Snippet;
  }

  let { header, children }: Props = $props();
</script>

<emma-layout>
  <header>
    {@render header()}
  </header>
  <main class="flow">
    {@render children()}
  </main>
</emma-layout>

<style>
  emma-layout {
    display: grid;
    gap: calc(var(--app-padding) * 2.5);

    max-width: 1920px;
    margin-inline: auto;

    padding-inline: var(--app-padding);
    padding-block-end: 50svh;

  }

  header {
    margin-block-start: calc(var(--app-padding) * 2);
  }
</style>
