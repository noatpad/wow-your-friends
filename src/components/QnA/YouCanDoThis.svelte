<script>
  import { fly } from "svelte/transition";

  export let index = 3;
  $: delay = 100 + 75 * index;
</script>

<img
  src="gifs/you-can-do-this.gif"
  alt="You can do this."
  transition:fly={{ delay, y: '-100%' }}
>

<style>
  img {
    display: block;
    max-height: 350px;
    width: 100%;
    margin: 0 auto;
    object-fit: contain;
  }
</style>
