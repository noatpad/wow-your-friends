<script lang="ts">
  import type { Side } from './AnswerCard';
  import breakpoint from '../breakpoint';
  import cardSlide from '../shared/cardSlide';

  export let side: Side = 'middle';
  export let tilt = 0;
  export let index = 1;
  $: delay = index * 75 + 100;
  $: left = (side === 'left');
  $: middle = (side === 'middle');
  $: right = (side === 'right');
  $: small = ($breakpoint === 'small');
  $: mobile = ($breakpoint === 'mobile');
</script>

<div
  class="postcard"
  class:left
  class:middle
  class:right
  class:small
  class:mobile
  style:transform="rotate({tilt}deg)"
  transition:cardSlide={{ tilt, delay }}
>
  <slot />
</div>

<style lang="scss">
  .postcard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 520px;
    aspect-ratio: 31 / 20;
    padding: 2em;
    margin: 1em 0 3em;
    background: #f2ebe8;
    background: url("images/postcard.jpg") no-repeat center center;
    background-size: contain;
    color: var(--beige);
    font-size: 1.1em;
    text-align: center;
  }

  .left, .middle { margin-right: auto; }
  .right, .middle { margin-left: auto; }

  .mobile {
    width: 100%;
    max-width: 400px;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 0.8em;
  }
</style>
