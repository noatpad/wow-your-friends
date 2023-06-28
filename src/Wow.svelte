<script>
  import Hero from "./components/Hero.svelte";
  import Journal from "./components/Journal/Journal.svelte";
  import Milestones from "./components/Milestones/Milestones.svelte";
  import QnA from "./components/QnA/QnA.svelte";
  import Footer from "./components/Footer/Footer.svelte";

  import breakpoint from "./components/breakpoint";
</script>

<Hero />
<div
  class="layout"
  class:small={$breakpoint === 'small'}
  class:mobile={$breakpoint === 'mobile'}
>
  <Journal />
  <Milestones />
  <QnA />
</div>
<Footer />

<style lang="scss">
  .layout {
    --m: 4em;
    width: calc(100% - var(--m) * 2);
    max-width: 900px;
    margin: 0 auto;

    &.small { --m: 3em; }
    &.mobile { --m: 1em; }
  }
</style>
