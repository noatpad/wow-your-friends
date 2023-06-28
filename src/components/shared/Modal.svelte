<script lang="ts">
  import { fade } from "svelte/transition";
  import { quartOut } from "svelte/easing";

  import breakpoint from "../breakpoint";
  import cardSlide from "./cardSlide";

  enum State { Open, Closing, Closed };

  export let show = false;
  const tilt = -2;
  let state = State.Closed;
  let dialog: HTMLDialogElement;

  const startClosing = () => (state = State.Closing);

  $: state = show ? State.Open : State.Closed;
  $: small = $breakpoint === 'small' || $breakpoint === 'mobile';
  $: if (show) dialog?.showModal();
  $: if (state === State.Closed) dialog?.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  class:closing={state === State.Closing}
  bind:this={dialog}
  on:click|self={startClosing}
  on:cancel|preventDefault={startClosing}
  on:close={() => (show = false)}
>
  {#if state === State.Open}
    <div class="backdrop" transition:fade={{ duration: 500, easing: quartOut }} />
    <div
      class="modal"
      class:small
      on:click|stopPropagation
      on:outroend={() => (state = State.Closed)}
      transition:cardSlide={{ tilt }}
      style:transform="rotate({tilt}deg)"
    >
      <slot />
    </div>
  {/if}
</dialog>

<style lang="scss">
  dialog {
    overflow: unset;

    // Backdrop transitions and animations currently don't work on Firefox, so I'm doing a workaround with a filler div
    &::backdrop { display: none; }

    &[open] {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background: transparent;
    }
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #0008;
    pointer-events: none;
  }

  .modal {
    position: relative;
    left: 1em;
    width: 100%;
    max-width: 800px;
    max-height: min(600px, 90vh);
    padding: 2em;
    margin: 2em;
    background: #f2e7e3;
    color: #413b35;
    overflow-y: auto;

    &.small {
      padding: 2em 1em;
      margin: 1em;
    }
  }
</style>
