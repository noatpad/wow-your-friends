<script lang="ts">
  import type { Milestone } from "./Milestones";
  import Color from "../shared/Color.svelte";

  import { formatDate, getOrdinalSuffix } from "../utils";
  import breakpoint from "../breakpoint";

  export let achievement: Milestone;
  let messageLines;

  $: ({ date, message } = achievement);
  $: formattedDate = formatDate(date);
  $: if (message) messageLines = message.split(' /n ');
  $: mobile = ($breakpoint === 'mobile');
</script>

<tr>
  <td class="date" class:mobile>{formattedDate}</td>
  <td class="event">
    <p>
      {#if achievement.type === 'threshold'}
        {@const c = (achievement.count === 202 ? 'red' : 'yellow')}
        {@const bold = (achievement.count % 100 === 0)}
        <Color {c} {bold}>{achievement.count}</Color> players have achieved 202!
      {:else if achievement.type === 'first'}
        {#if achievement.firstPlace}
          The <Color c="yellow">first</Color> ever 202 was achieved!
        {:else}
          The first 202 on {achievement.platform} was achieved!
        {/if}
      {:else if achievement.type === 'sameday'}
        {achievement.count} players achieved 202 on the same day!
      {:else if achievement.type === 'timeframe'}
        {achievement.count} players got 202 within <b>{achievement.hours}</b> hours!
      {:else if achievement.type === 'streak'}
        <b>{achievement.days}</b> consecutive days where at least one player got the golden berry!
      {:else if achievement.type === 'anniversary'}
        Farewell's {achievement.year}<sup>{getOrdinalSuffix(achievement.year)}</sup> anniversary!
      {:else if achievement.type === 'special'}
        {achievement.text}
      {/if}
    </p>
  </td>
</tr>
{#if message}
  <tr class="message">
    <td colspan={2}>
      {#each messageLines as line}
        <p>{line}</p>
      {/each}
    </td>
  </tr>
{/if}

<style lang="scss">
  .date {
    width: 25%;
    opacity: 0.8;
    font-size: 0.9em;
    text-align: right;

    &.mobile { font-size: 0.8em; }
  }

  .event { width: 75%; }

  .message {
    width: 100%;
    font-size: 0.75em;
    font-style: italic;
    color: #9c717d;
    text-align: center;
  }
</style>
