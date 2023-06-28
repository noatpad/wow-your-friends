<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let x: number;
  export let y: number;
  export let text: string;

  let mounted = false;
  onMount(() => (mounted = true));
</script>

{#if mounted}
  <div
    style:left="{x}px"
    style:top="{y}px"
    style:transform="translate(-50%, -100%)"
    transition:fade={{ duration: 100 }}
  >
    <p>{text}</p>
  </div>
{/if}

<style lang="scss">
  div {
    position: fixed;
    width: 180px;
    padding: 0.7em;
    border-radius: 0.5em;
    background: #5b4683;
    color: #eee;
    font-size: 0.8em;
    text-align: center;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      top: calc(100% + 6px);
      left: calc(50% - 3px);
      transform: translateY(-50%);
      height: 0;
      width: 0;
      border: 6px solid transparent;
      border-top-color: #5b4683;
    }
  }
</style>
