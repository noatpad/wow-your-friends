<script lang="ts">
  import { getOrdinalSuffix } from "../utils";
  import PixelIcon from "../shared/PixelIcon.svelte";

  export let rank: number;

  $: suffix = (rank > 0) ? getOrdinalSuffix(rank) : '';
</script>

<div class:berry={rank > 0 && rank < 4}>
  {#if rank > 0}
    {#if rank < 4}
      <div>
        {#if rank === 1}
          <PixelIcon src="icons/goldberry.png" alt="Golden berry icon" />
        {:else if rank === 2}
          <PixelIcon src="icons/silverberry.png" alt="Silver berry icon" />
        {:else if rank === 3}
          <PixelIcon src="icons/bronzeberry.png" alt="Bronze berry icon" />
        {/if}
      </div>
    {/if}
    <span class="rank">{rank}<sup>{suffix}</sup></span>
  {:else}
    -
  {/if}
</div>

<style lang="scss">
  div {
    display: grid;
    font-size: 1.25em;
    align-items: center;
    justify-content: center;
    &.berry {
      grid-template-columns: repeat(3, 1fr);
      div:first-child {
        display: flex;
        justify-content: right;
      }
    }
  }

  .rank {
    text-align: center;
  }

  sup {
    font-size: 0.6em;
  }
</style>
