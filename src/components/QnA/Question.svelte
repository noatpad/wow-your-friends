<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { elasticOut, quartOut } from 'svelte/easing';
  import { ChevronRightIcon } from 'svelte-feather-icons';

  import { keyActivateCb } from '../utils';
  import breakpoint from '../breakpoint';

  export let q: string;
  const chevRotate = tweened(0, {
    duration: 1000,
    easing: elasticOut
  });
  const answerHeight = tweened(0, {
    duration: 800,
    easing: quartOut
  })
  let open = false;
  let measureHeight = 0;

  const toggleOpen = () => (open = !open);

  $: small = ($breakpoint === 'small');
  $: mobile = ($breakpoint === 'mobile');
  $: if (open) {
    chevRotate.set(90);
    answerHeight.set(measureHeight + 50);
  } else {
    chevRotate.set(0);
    answerHeight.set(0);
  }
</script>

<div class="qna">
  <div
    class="question"
    role="button"
    on:click={toggleOpen}
    on:keydown={keyActivateCb(toggleOpen)}
    tabindex="0"
  >
    <span class="chevron" style:transform="rotate({$chevRotate}deg)">
      <ChevronRightIcon size="1.75x" strokeWidth={3} />
    </span>
    <h2>{q}</h2>
  </div>
  <div class="measure-wrapper">
    <div
      class="measure"
      class:small
      class:mobile
      bind:clientHeight={measureHeight}
    >
      <slot />
      {$breakpoint}
    </div>
  </div>
  <div
    class="answer"
    class:small
    class:mobile
    class:open
    style:height="{$answerHeight}px"
  >
    {#if open}
      <slot />
    {/if}
  </div>
</div>

<style lang="scss">
  h2 { font-weight: normal; }

  .question {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 1em;
    padding-left: 0;
    cursor: pointer;
  }

  .chevron {
    display: inline-flex;
    align-items: center;
  }

  .measure-wrapper {
    height: 0;
    overflow: hidden;
  }

  .measure { visibility: hidden; }
  .answer {
    padding: 0 1em;
    overflow: hidden;
  }

  .measure, .answer {
    &.small { padding: 0 0.5em; }
    &.mobile {
      margin-right: -1em;
      margin-left: -1em;
    }
  }
</style>
