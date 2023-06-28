<script lang="ts">
  import IntersectionObserver from 'svelte-intersection-observer';
  import breakpoint from '../breakpoint';

  let element;
  let intersecting;
  $: mobile = ($breakpoint === 'mobile');
</script>

<div class="wrapper" class:open={intersecting}>
  <div class="cover front"></div>
  <div class="cover back" class:open={intersecting}>
    <p class:mobile>Madeline</p>
  </div>
  <IntersectionObserver {element} bind:intersecting once>
    <div class="observer" bind:this={element}></div>
  </IntersectionObserver>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    transform-origin: left;

    &.open {
      animation: flip 0.5s ease-in-out forwards;
    }
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0 1em 1em 0;
    background: #e07360;
    background: url("images/journal-cover.jpg") no-repeat center center;
    background-size: 100% 100%;

    &.open {
      animation: disappear 0.001s 0.25s forwards;
    }

    p {
      position: relative;
      top: 3em;
      padding: 0.75em;
      text-align: center;
      background: url("images/title-smear.png") no-repeat center center;
      font-size: 2.5em;
      color: #5f2a43;

      &.mobile { font-size: 2em; }
    }
  }

  .observer {
    position: absolute;
    top: 50%;
  }

  @keyframes flip {
    from { transform: scaleX(1); }
    to { transform: scaleX(-1); }
  }

  @keyframes disappear {
    from { opacity: 1; }
    to { opacity: 0; }
  }
</style>
