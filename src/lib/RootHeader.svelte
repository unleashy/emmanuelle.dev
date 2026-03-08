<script lang="ts">
  import { resolve } from "$app/paths";

  interface Props {
    isMainHeader: boolean;
  }

  let { isMainHeader }: Props = $props();
</script>

{#snippet link()}
  <a href={resolve("/")}>
    <div class="box" role="presentation"></div>
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
    letter-spacing: var(--font-serif-tracking-0);
    text-wrap: balance;
  }

  a {
    position: relative;
    display: flex;
    gap: 1ch;

    color: inherit;
    text-decoration: none;

    &:hover,
    &:focus {
      color: deeppink;
    }

    &::before {
      /* Provide a larger target area */
      content: "";
      position: absolute;
      inset: calc(-2 * var(--app-padding));
    }
  }

  .box {
    height: 1em;
    aspect-ratio: 1;

    background: linear-gradient(120deg, hotpink, pink);
    border-radius: 0.125em;
  }

  .name {
    /* Improve optical alignment against .box */
    position: relative;
    top: 0.05em;
  }
</style>
