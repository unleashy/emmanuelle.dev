<script lang="ts">
  import { resolve } from "$app/paths";

  interface Props {
    isMainHeader: boolean;
  }

  let { isMainHeader }: Props = $props();
</script>

{#snippet link()}
  <a href={resolve("/")}>
    <div class="flower" role="presentation"></div>
    <span class="name">emmablog</span>
  </a>
{/snippet}

{#if isMainHeader}
  <h1 class="heading">
    {@render link()}
  </h1>
{:else}
  <div class="heading">
    {@render link()}
  </div>
{/if}

<style>
  .heading {
    display: flex;

    font-size: var(--t-0);
    font-weight: inherit;
    line-height: 1;
    letter-spacing: var(--font-sans-tracking-0);
    text-wrap: balance;
  }

  a {
    position: relative;
    display: flex;
    gap: 0.75ch;

    background: transparent;
    color: var(--c-app-fg);
    text-decoration: none;
    font-style: italic;

    &:hover,
    &:focus {
      color: var(--c-accent1);
    }

    &:active {
      background-color: inherit;
    }

    &::before {
      /* Provide a larger target area */
      content: "";
      position: absolute;
      inset: calc(-2 * var(--app-padding));
    }
  }

  .flower {
    height: 1.25em;
    aspect-ratio: 1;

    background: var(--g-funky);

    clip-path: shape(
      from 77.72% 67.32%,
      arc to 57.35% 81.85% of 13.16% large cw,
      arc to 32.68% 77.72% of 13.16% large cw,
      arc to 18.15% 57.35% of 13.16% large cw,
      arc to 22.28% 32.68% of 13.16% large cw,
      arc to 42.65% 18.15% of 13.16% large cw,
      arc to 67.32% 22.28% of 13.16% large cw,
      arc to 81.85% 42.65% of 13.16% large cw,
      arc to 77.72% 67.32% of 13.16% large cw
    );
  }
</style>
