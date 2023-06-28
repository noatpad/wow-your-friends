<script lang="ts">
  import { getOrdinalNumber } from "../utils";
  import PixelIcon from "../shared/PixelIcon.svelte";

  export let rank: number;
  $: placement = (rank > 0) ? getOrdinalNumber(rank) : '-';
</script>

{#if rank > 0}
  <div>
    {#if rank === 1}
      <PixelIcon src="icons/goldberry.png" alt="Golden berry icon" />
    {:else if rank === 2}
      <PixelIcon src="icons/silverberry.png" alt="Silver berry icon" />
    {:else if rank === 3}
      <PixelIcon src="icons/bronzeberry.png" alt="Bronze berry icon" />
    {/if}
    {placement}
  </div>
{:else}
  -
{/if}

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
