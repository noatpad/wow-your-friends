<script lang="ts">
  import breakpoint from "../breakpoint";

  export let checked = false;

  $: mobile = ($breakpoint === 'mobile');
</script>

<label class:mobile>
  <input type="checkbox" class:mobile bind:checked>
  <slot />
</label>

<style lang="scss">
  label {
    display: flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
    font-style: italic;

    &.mobile { font-size: 0.9em; }
  }

  input {
    --box-size: 1.2em;
    display: grid;
    place-content: center;
    appearance: none;
    height: var(--box-size);
    width: var(--box-size);
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    margin: 0.4em 0;
    background: transparent;
    color: currentColor;
    font: inherit;
    cursor: pointer;

    &::before {
      --check-size: 0.7em;
      content: "";
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      height: var(--check-size);
      width: var(--check-size);
      background: var(--bg);
      transform: scale(0);
      transform-origin: center;
      transition: 0.1s transform ease-out;
    }

    &:checked::before { transform: scale(1); }
  }
</style>
