<script lang="ts">
  import Rank from "./Rank.svelte";
  import Medals from "./Medals.svelte";

  import type { RankedConqueror } from "./Conqueror";
  import { formatDate } from "../utils";
  import breakpoint from "../breakpoint";
  import tooltip from "../shared/useTooltip";

  export let run: RankedConqueror;

  $: ({
    rank,
    name,
    date,
    platform,
    verified,
    proof,
    flags
  } = run);
  $: formattedDate = formatDate(date);
  $: small = ($breakpoint === 'small');
  $: mobile = ($breakpoint === 'mobile');
  $: shortenRow = small || mobile;
</script>

<tr
  class:mobile
  class:unverified={!verified.value}
  class:not={flags.includes('not202')}
  on:click={() => window.open(proof.url, '_blank')}
>
  <td>
    <Rank {rank} />
  </td>
  {#if shortenRow}
    <td>
      <div>
        <p class:note={verified.note} use:tooltip={verified.note}>{name}</p>
        <p class="detail">{date} · {platform}</p>
      </div>
    </td>
  {:else}
    <td class:note={verified.note} use:tooltip={verified.note}>
      {name}
    </td>
    <td class="detail">
      {formattedDate}
    </td>
    <td class="detail">
      {platform}
    </td>
  {/if}
  <td>
    <Medals proofType={proof.type} {flags} />
  </td>
</tr>

<style lang="scss">
  tr {
    transition: background 0.2s ease-out;
    cursor: pointer;

    &:nth-child(2n) { background: #efdcf7; }
    &:hover { background: #e4baf0; }

    &.mobile { font-size: 0.9em; }
    &.not { background: #e5cfef; }

    &.unverified {
      background: #d9ccdd;
      color: #7e6f9d;
      font-style: italic;

      &:hover { background: #c8b5ce; }
    }
  }

  td {
    padding: 0.4em;
    :first-child {
      min-width: 6em;
    }
  }

  .note::after { content: '*' }

  .detail {
    font-size: 0.75em;
  }
</style>
