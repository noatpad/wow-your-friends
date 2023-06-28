<script lang="ts">
  import Row from "./Row.svelte";

  import type { RankedConqueror } from "./Conqueror";
  import breakpoint from "../breakpoint";

  export let conquerors: RankedConqueror[];
  $: small = ($breakpoint === "small");
  $: mobile = ($breakpoint === "mobile");
</script>

<div class="table-wrapper" class:small class:mobile>
  <table>
    <tbody>
      {#each conquerors as conqueror (`${conqueror.name}-${conqueror.date}`)}
        <Row run={conqueror} />
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-wrapper {
    height: 600px;
    border-bottom: 3px solid #c885ff40;
    overflow-y: scroll;

    &.small { height: 550px; }
    &.mobile { height: 500px; }
  }
</style>
