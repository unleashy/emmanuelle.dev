<script lang="ts">
  import { highlight, type languages } from "$lib/highlighting";

  interface Props {
    language: keyof typeof languages;
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

  let { language, code }: Props = $props();
</script>

<pre><code>{@html highlight(dedent(code), language)}</code></pre>

<style>
  pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    hyphens: none;
  }

  code {
    display: block;

    padding-inline: 1.75rem;
    padding-block: 1.75rem;
    /* optically align vs line-height (no maths here just vibes) */
    padding-block-end: 1.5rem;

    font-weight: var(--font-mono-weight-0);
    line-height: var(--font-mono-leading-0);

    border: 2px solid var(--c-code-border);

    border-radius: 1rem;
    @supports (corner-shape: squircle) {
      border-radius: 2rem;
      corner-shape: squircle;
    }

    &::before,
    &::after {
      content: none;
    }
  }

  :global {
    hl-line {
      display: inline-block;
    }

    hl-line + hl-line {
      margin-block-start: 0.3em;
    }

    hl-keyword {
      color: var(--c-accent1);
      font-weight: var(--font-mono-weight-2);
    }

    hl-punctuation {
      color: var(--c-slight-fg);
    }

    hl-comment {
      color: light-dark(#473b1f, #fef6bac0);
      background-color: light-dark(#f4dd0016, #ffaa001e);
    }
  }
</style>
