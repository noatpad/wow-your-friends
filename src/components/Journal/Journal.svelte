<script lang="ts">
  import { onMount } from "svelte";

  import Cover from "./Cover.svelte";
  import Total from "./Total.svelte";
  import Checkbox from "./Checkbox.svelte";
  import LegendModal from "./LegendModal.svelte";
  import ConquerorTable from "../ConquerorTable/Table.svelte";

  import type { NewConqueror, RankedConqueror } from "../ConquerorTable/Conqueror";
  import breakpoint from "../breakpoint";
  import { getToday, keyActivateCb, sortByDate } from "../utils";

  const today = getToday();

  let allConquerors: NewConqueror[] = [];
  let filteredConquerors: RankedConqueror[] = [];
  let totalCount = 0;

  let showUnverified = false;
  let showNon202 = false;
  let showDTS = false;

  let showLegendModal = false;

  const sortConquerors = () => { allConquerors.sort((a, b) => sortByDate(a.date, b.date)) }

  onMount(async () => {
    const response = await fetch('/conquerors.json');
    allConquerors = (await response.json()) as NewConqueror[];
    sortConquerors();
  });

  $: if (allConquerors.length) {
    const filtered = (showUnverified && showNon202 && showDTS) ? allConquerors : (
      allConquerors.filter((c) => (
        (showUnverified || c.verified.value) &&
        (showNon202 || !c.flags.includes('not202')) &&
        (showDTS || !c.flags.includes('dts'))
      ))
    );
    sortConquerors();

    let count = 0;
    filteredConquerors = filtered.map((c) => ({
      ...c,
      rank: c.flags.includes('not202') ? 0 : ++count
    }));
    totalCount = count;
  }
  $: mobile = ($breakpoint === 'mobile');
</script>

<section class:mobile>
  <Cover />
  <h2 class:mobile>Celeste Conquerors</h2>
  <hr class:mobile />
  <ConquerorTable conquerors={filteredConquerors} />
  <Total count={totalCount} {showUnverified} {showDTS} />
  <div class="bottom" class:mobile>
    <div class="filters">
      <Checkbox bind:checked={showUnverified}>Show unverified runs</Checkbox>
      <Checkbox bind:checked={showNon202}>Show non-202 runs</Checkbox>
      <Checkbox bind:checked={showDTS}>Show runs with DTS</Checkbox>
    </div>
    <div class="notes">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        role="button"
        on:click={() => (showLegendModal = true)}
        on:keydown|preventDefault={keyActivateCb(() => (showLegendModal = true))}
        tabindex="0"
      >What do those icons mean?</a>
      <p class="updated">Updated as of {today}</p>
    </div>
  </div>
</section>
<LegendModal bind:show={showLegendModal} />

<style lang="scss">
  section {
    position: relative;
    max-width: 750px;
    padding: 1.5em 4em 1.5em 2.5em;
    margin: 0 auto;
    transform: rotate(-2deg);
    border-radius: 0 1em 1em 0;
    background: var(--white);
    background: url("images/page.jpg") no-repeat center center;
    background-size: 100% 100%;
    color: var(--purple-s);

    &.mobile {
      padding: 1.5em 1em 1.5em 0.5em;
      transform: rotate(-1deg);
    }
  }

  h2 {
    padding-bottom: 0.5em;
    font-weight: normal;
    color: var(--purple);
    text-transform: uppercase;

    &.mobile {
      padding-left: 1em;
      font-size: 1.2em;
    }
  }

  hr {
    position: relative;
    left: -2.5em;
    width: calc(100% + 6.5em);
    border: var(--pink) solid 2px;
    opacity: 0.2;

    &.mobile {
      left: -0.5em;
      width: calc(100% + 1.5em);
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    gap: 1em;

    &.mobile {
      padding: 0 1em;
      gap: 0.5em;
      font-size: 0.9em;
    }
  }

  .filters, .notes { flex: 1; }

  .notes {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 0.4em;
    text-align: right;
  }

  .updated {
    font-size: 0.9em;
    font-style: italic;
    opacity: 0.7;
  }
</style>
