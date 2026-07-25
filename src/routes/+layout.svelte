<script lang="ts">
  import RootLayout from "$lib/RootLayout.svelte";
  import RootHeader from "$lib/RootHeader.svelte";
  import { page } from "$app/state";
  import type { LayoutProps } from "./$types";

  import "@fontsource-variable/ysabeau/wght.css";
  import "@fontsource-variable/ysabeau/wght-italic.css";
  import "@fontsource-variable/spline-sans-mono/wght.css";
  import "@fontsource-variable/spline-sans-mono/wght-italic.css";
  import "$lib/style.css";

  let { children }: LayoutProps = $props();
  let isHomepage = $derived(page.url.pathname === "/");
</script>

<RootLayout {children}>
  {#snippet header()}
    <RootHeader isMainHeader={isHomepage} />
  {/snippet}
</RootLayout>
