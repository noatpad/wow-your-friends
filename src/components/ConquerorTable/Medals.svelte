<script lang="ts">
  import type { Flag, ProofType } from "./Conqueror";
  import PixelIcon from "../shared/PixelIcon.svelte";

  export let proofType: ProofType;
  export let flags: Flag[];
</script>

<div class="icons">
  
  {#if proofType === 'video'}
    <span><PixelIcon src="icons/video.png" alt="Video proof" /></span>
  {:else}
    <span><PixelIcon src="icons/screenshot.png" alt="Screenshot proof" /></span>
  {/if}
  {#if flags.includes('double')}
    <span><PixelIcon src="icons/moonberry.png" alt="Double golden!" /></span>
  {/if}
  {#if flags.includes('nks')}
    <span><PixelIcon src="icons/key.png" alt="No key skip!" /></span>
  {/if}
  {#if flags.includes('pre202')}
    <span><PixelIcon src="icons/ghostberry.png" alt="Pre-202 run!" /></span>
  {/if}
  {#if flags.includes('dts')}
    <span><PixelIcon src="icons/pink-crystal.png" alt="Dash Trigger skip!" /></span>
  {/if}
  {#if flags.includes('meme')}
    <span><PixelIcon src="icons/eenox.png" alt="Meme run...why" /></span>
  {/if}
</div>

<style>
  div {
    display: flex;
  }

  span {
    display: inline-flex;
    width: 1.7em;
    justify-content: center;
  }
</style>
