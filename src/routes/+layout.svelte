<script lang="ts">
  import RootLayout from "$lib/RootLayout.svelte";
  import RootHeader from "$lib/RootHeader.svelte";
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  import "$lib/style.css";

  let { children }: LayoutProps = $props();
  let isHomepage = $derived(page.url.pathname === "/");
</script>

<RootLayout {children}>
  {#snippet header()}
    <RootHeader isMainHeader={isHomepage} />
  {/snippet}
</RootLayout>
