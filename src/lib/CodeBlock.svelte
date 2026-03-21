<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLPreElement> {
    code: string;
  }

  function dedent(str: string): string {
    let lines = str.split("\n");
    let minIndent = Number.MAX_VALUE;
    for (let line of lines) {
      let m = line.match(/^(\s*)\S+/u);
      if (m) {
        let indent = m[1].length;
        minIndent = Math.min(minIndent, indent);
      }
    }

    if (minIndent === Number.MAX_VALUE) {
      return str.trim();
    }

    return lines
      .map((line) => line.slice(minIndent).trimEnd())
      .join("\n")
      .trim();
  }

  let { code, ...rest }: Props = $props();
</script>

<pre {...rest}><code>{dedent(code)}</code></pre>

<style>
  pre {
    max-width: none;
  }

  code {
    display: block;
    max-width: none;
    padding-inline: 1rem;
    padding-block: 1rem;
    /* optically align vs line-height */
    padding-block-end: 0.85rem;
  }
</style>
