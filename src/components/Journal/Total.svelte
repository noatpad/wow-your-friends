<script lang="ts">
  import Color from "../shared/Color.svelte";
  import breakpoint from "../breakpoint";

  export let count: number;
  export let showUnverified: boolean;
  export let showDTS: boolean;

  const getAsteriskText = () => {
    const flags = [];
    if (showUnverified) flags.push('unverified');
    if (showDTS) flags.push('DTS');
    return `*(including ${flags.join(' & ')} runs)`;
  }

  $: asteriskText = (showUnverified || showDTS) ? getAsteriskText() : '';
  $: small = ($breakpoint === "small");
  $: mobile = ($breakpoint === "mobile");
</script>

<div class:small class:mobile>
  <p class:mobile>To this day, only <Color c="red" bold>{count}</Color> have conquered every strawberry{asteriskText && '*'}</p>
  {#if asteriskText}
    <p class="asterisk">{asteriskText}</p>
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 65px;
    padding: 0.2em 0;

    &.small, &.mobile {
      min-height: 85px;
    }

    &.mobile { padding: 0 0.5em; }
  }

  p {
    font-size: 1.2em;
    text-align: center;

    &.mobile { font-size: 1em; }
  }

  .asterisk {
    font-size: 0.8em;
    font-style: italic;
    opacity: 0.8;
  }
</style>
