<script lang="ts">
  import { onMount } from "svelte";
  import Achievement from "./Achievement.svelte";

  import type { Milestone } from "./Milestones";
  import breakpoint from "../breakpoint";

  let milestones: Milestone[] = [];

  onMount(async () => {
    const response = await fetch('/milestones.json');
    milestones = (await response.json()) as Milestone[];
  });

  $: small = ($breakpoint === 'small');
  $: mobile = ($breakpoint === 'mobile');
</script>

<section>
  <div class="ticket" class:mobile>
    <h2>Milestones</h2>
  </div>
  <div class="notepad" class:mobile>
    <table class:small class:mobile>
      <tbody>
        {#each milestones as achievement}
          <Achievement {achievement} />
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style lang="scss">
  section { color: var(--beige); }

  table {
    width: 100%;
    padding: 1em 2em 2em;
    table-layout: fixed;
    border-spacing: 12px 9px;

    &.small { padding: 1em 1em 2em; }
    &.mobile {
      padding: 0.5em 0.5em 2em;
      font-size: 0.9em;
    }
  }

  .ticket {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 80%;
    max-width: 380px;
    margin: 0 auto -8rem;
    transform: rotate(3deg);
    background: #ffda8f;
    background: url("images/ticket.png") no-repeat center center;
    background-size: contain;
    z-index: 1;

    &.mobile { font-size: 0.8em; }
  }

  .notepad {
    width: 100%;
    max-width: 620px;
    height: 700px;
    padding-top: 5em;
    margin: 0 auto;
    transform: rotate(-1deg);
    background: #f7ece0;
    background: url("images/notepad.png") no-repeat center center;
    background-size: cover;
    overflow-y: scroll;

    &.mobile {
      padding-top: 4em;
      height: 600px;
    }
  }
</style>
