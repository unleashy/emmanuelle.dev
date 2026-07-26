<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
  let noteId = $props.id();
</script>

<!--suppress HtmlWrongAttributeValue-->
<fieldset role="note" aria-labelledby={noteId}>
  <legend id={noteId}>By the way</legend>
  <p class="content">{@render children()}</p>
</fieldset>

<style>
  fieldset {
    --legend-offset: 0.75ch;

    padding-block: 1.5rem;
    padding-inline: 1.75rem;
    /* optically align vs line-height (no maths here just vibes) */
    padding-block-end: 1.4rem;

    border: 2px solid var(--c-btw-border);

    border-radius: 1rem;
    @supports (corner-shape: squircle) {
      border-radius: 2rem;
      corner-shape: squircle;
    }
  }

  legend {
    margin-inline-start: -0.15em;
    padding-inline-start: 0.15em;
    padding-inline-end: 0.3em;

    color: var(--c-btw-title);
    font-weight: var(--font-sans-weight-1);
    text-box: trim-both cap alphabetic;
  }
</style>
