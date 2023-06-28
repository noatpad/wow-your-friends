<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, slide, type SlideParams, type TransitionConfig } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';

  import breakpoint from './breakpoint';

  const title = 'Wow Your Friends';
  const charCountForWord = [0, 3, 7];

  let mounted = false;
  let letterDropCount = 0;

  onMount(() => (mounted = true));

  const fadeSlide = (node: Element, options: SlideParams): TransitionConfig => {
    const slideTrans = slide(node, options);
    return {
      ...options,
      css: (t, u) => `${slideTrans.css(t, u)} opacity:${t};`
    }
  };

  $: words = title.split(' ');
  $: charCount = title.replace(/\s+/g, '').length;
  $: showTagline = showTagline || letterDropCount >= charCount;
  $: small = $breakpoint === 'small';
  $: mobile = $breakpoint === 'mobile';
</script>

<header class:mobile>
  {#if mounted}
    <h1 class:small class:mobile>
      {#each words as word, i}
        <span class="word">
          {#each [...word] as letter, j}
            <span
              class="letter"
              in:fly={{
                y: -100,
                duration: 800,
                delay: 150 + (charCountForWord[i] + j) * 50,
                easing: quartOut
              }}
              on:introend={() => letterDropCount++}
            >
              {letter}
            </span>
          {/each}
          {#if mobile && i === 1}
            <br />
          {/if}
        </span>
      {/each}
    </h1>
  {/if}
  {#if showTagline}
    <p
      class:small
      class:mobile
      in:fadeSlide={{ axis: 'y', duration: 1000, easing: quartOut }}
    >A record of every player who obtained every strawberry in Celeste</p>
  {/if}
</header>

<style lang="scss">
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;
    width: 100%;
    padding: 2em;
    margin-bottom: -6em;
    background: linear-gradient(#fcfae3, transparent);
    background-image:
      linear-gradient(transparent 25%, var(--bg)),
      url("images/golden-room.jpg");
    background-position: top center;

    &.mobile {
      height: 550px;
      padding: 1em;
    }
  }

  h1, p { text-align: center; }

  h1 {
    font-size: 4em;
    text-shadow: 0 3px var(--bg);

    &.small { font-size: 3em; }
    &.mobile { font-size: 2.5em; }
  }

  p {
    font-size: 1.2em;
    text-shadow: 0 2px var(--bg);

    &.small { font-size: 1.1em; }
    &.mobile { font-size: 1em; }
  }

  .word { white-space: nowrap; }
  .word + .word::before { content: " "; }
  .letter { display: inline-block; }
</style>
