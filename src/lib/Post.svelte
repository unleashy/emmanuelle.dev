<script lang="ts">
  import type { Snippet, ComponentProps } from "svelte";
  import PostHeading from "$lib/PostHeading.svelte";

  interface Props extends ComponentProps<typeof PostHeading> {
    children: Snippet;
  }

  let { children, ...headingProps }: Props = $props();
</script>

<PostHeading {...headingProps} />
<emma-post class="flex flow flow--prose">{@render children()}</emma-post>
