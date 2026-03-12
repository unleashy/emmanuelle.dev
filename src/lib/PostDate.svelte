<script lang="ts">
  import type { Temporal } from "temporal-polyfill-lite";

  interface Props {
    date: Temporal.PlainDate;
  }

  let { date }: Props = $props();
  let formattedDate = $derived(date.toLocaleString("en-GB", { dateStyle: "long" }));
</script>

<time datetime={date.toJSON()} class="text-slight">{formattedDate}</time>
