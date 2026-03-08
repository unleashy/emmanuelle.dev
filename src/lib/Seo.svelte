<script lang="ts">
  interface Props {
    title?: string;
    description?: string;
  }

  let { title, description }: Props = $props();
</script>

<svelte:head>
  {#if title}
    <title>{title} • emmablog</title>
  {:else}
    <title>emmablog</title>
  {/if}
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>
