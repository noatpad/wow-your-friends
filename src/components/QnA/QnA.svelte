<script>
  import Question from "./Question.svelte";
  import AnswerCard from "./AnswerCard.svelte";
  import Color from "../shared/Color.svelte";
  import YouCanDoThis from "./YouCanDoThis.svelte";
  import BrandIcon from "../shared/BrandIcon.svelte";

  import breakpoint from "../breakpoint";

  const linkIconProps = { color: true, height: '2.5em', width: '2.5em' };

  $: mobile = ($breakpoint === 'mobile');
</script>
<section>
  <Question q="What exactly is this list?">
    <AnswerCard side="left" tilt={2} index={1}>
      <p><Color c="celeste">Celeste</Color> is a challenging game about climbing a mountain & overcoming its obstacles in your journey. One of, if not, the biggest challenge it offers is collecting all 202 strawberries.</p>
    </AnswerCard>
    <AnswerCard side="right" tilt={-3} index={2}>
      <p>And with the release of <Color c="periwinkle">Celeste: Farewell</Color>, the game introduced the hardest berry to be collected, by far:</p>
      <p>The <Color c="yellow">Farewell golden strawberry</Color></p>
      <img class="art-image" src="images/golden-strawberry.png" alt="Artwork of the golden strawberry">
    </AnswerCard>
    <AnswerCard tilt={4} index={3}>
      <p>This alone is most completionists' final hurdle to completing such a challenge, & it's quite the achievement for those who do.</p>
      <p><Color c="periwinkle">Wow Your Friends</Color> serves as a record for all those players who persevered and gathered every strawberry.</p>
    </AnswerCard>
  </Question>
  <Question q="I want to be a part of this list!">
    <AnswerCard tilt={3} index={1}>
      <p>Well first, you're gonna need to collect all 202 berries, & I wish you the best of luck on that journey.</p>
      <p>But on the flipside that you did get all of them as you're reading this, congrats!</p>
      <p><em>Seriously, that ain't easy.</em></p>
    </AnswerCard>
    <AnswerCard side="left" tilt={-4} index={2}>
      <p>The only thing needed from you is proof of you collecting Farewell's <Color c="yellow">golden strawberry</Color> in a recorded video from start to finish.</p>
      <p>Follow <a href="https://docs.google.com/spreadsheets/d/1FesTb6qkgMz-dCn7YdioRydToWSQNTg1axFEIHU4FF8/edit?pli=1#gid=1759333998" target="_blank" rel="noopener noreferrer">these guidelines</a> from the FWGC spreadsheet, as my criteria for verifying runs are the same as these.</p>
    </AnswerCard>
    <AnswerCard side="right" tilt={4} index={3}>
      <p>If you're unable to record your run, you can still submit a screenshot of your stats as proof, but due to how this can be exploited, you'll be listed as an <em>unverified</em> entry.</p>
      <p>Players under this category will have their entries hidden by default on the list.</p>
    </AnswerCard>
    <AnswerCard tilt={2} index={4}>
      <p>Then submit your run to the <a href="https://docs.google.com/spreadsheets/d/1FesTb6qkgMz-dCn7YdioRydToWSQNTg1axFEIHU4FF8/edit?pli=1#gid=571489394" target="_blank" rel="noopener noreferrer">FWGC list</a>!</p>
      <p>I have a script that runs every Saturday that adds newly verified runs on that spreadsheet that apply as 202 runs (after I review them, of course)</p>
      <p class="whoops">(I've had a bad streak of procrastination when updating this list over the years, so this will help me keep it up to date, ahah...)</p>
    </AnswerCard>
    <AnswerCard tilt={-2} index={5}>
      <p>You can also contact me directly to add your entry here too!</p>
      <p>Send me a DM on <a href="http://twitter.com/noatpad" target="_blank" rel="noopener noreferrer"><Color c="twitter">Twitter</Color></a>, ping/DM me on the <a href="https://discord.gg/celeste" target="_blank" rel="noopener noreferrer"><Color c="discord">Celeste Discord (@notepad)</Color></a>, or submit your run through <a href="https://github.com/noatpad/wow-your-friends/issues" target="_blank" rel="noopener noreferrer"><Color c="github">GitHub Issues</Color></a>.</p>
      <p>If everything checks out, welcome to the list!</p>
      <div class="icon-links" class:mobile>
        <a href="http://twitter.com/noatpad" target="_blank" rel="noopener noreferrer">
          <BrandIcon name="twitter" {...linkIconProps} />
        </a>
        <a href="https://discord.gg/celeste" target="_blank" rel="noopener noreferrer">
          <BrandIcon name="discord" {...linkIconProps} />
        </a>
        <a href="https://github.com/noatpad/wow-your-friends/issues" target="_blank" rel="noopener noreferrer">
          <BrandIcon name="github" {...linkIconProps} />
        </a>
      </div>
    </AnswerCard>
  </Question>
  <Question q="What's the Dash Trigger Skip?">
    <AnswerCard side="left" tilt={-3} index={1}>
      <p>In late 2021, a glitch was discovered known as the <a href="https://youtu.be/al_3Wu27C4M" target="_blank" rel="noopener noreferrer">Dash Trigger Skip</a>.</p>
      <p>In a nutshell, performing this skip will allow the player to keep the double dash throughout the majority of the chapter, significantly reducing the difficulty of Farewell.</p>
    </AnswerCard>
    <AnswerCard tilt={2} index={2}>
      <p>This glitch can be done in normal play, so a run done with DTS is <b>still considered a verified run</b>.</p>
      <p>However, because this greatly facilitates Farewell, the main roadblock to the 202 achievement, <b>these runs will be hidden by default</b> with a checkbox.</p>
    </AnswerCard>
  </Question>
  <Question q="This is really hard...">
    <AnswerCard side="right" tilt={-4} index={1}>
      <p>Yeah I won't sugarcoat it. This is a <em>really</em> hard challenge.</p>
      <p>There's a reason why so few have managed to overcome it, and it's because of that difficulty that I wanted to commemorate those players in a more memorable manner. A lot of patience and effort is needed to go so far.</p>
    </AnswerCard>
    <AnswerCard side="left" tilt={4} index={2}>
      <p>But if you believe you can, then I will as well. <Color c="marmalade">You're more capable than you think.</Color></p>
      <p>In the words of Madeline at the base of the mountain:</p>
    </AnswerCard>
    <YouCanDoThis />
  </Question>
  <Question q="Some special thanks">
    {#if mobile}
      <AnswerCard side="left" tilt={-2}>
        <ul>
          <li><Color c="discord">@DJTom3</Color> for initially maintaining the <a href="https://docs.google.com/spreadsheets/d/1FesTb6qkgMz-dCn7YdioRydToWSQNTg1axFEIHU4FF8" target="_blank" rel="noopener noreferrer">Farewell Golden Collectors' List</a>, as it's my primary source of information.</li>
          <li><Color c="discord">@mystral_fox</Color> as the active maintainer of the list.</li>
        </ul>
      </AnswerCard>
      <AnswerCard side="right" tilt={2}>
        <ul>
          <li>The <Color c="celeste">Celeste dev team</Color> for creating such a fantastic game.</li>
          <li>All the players on this list for going above and beyond to complete such a task.</li>
        </ul>
      </AnswerCard>
    {:else}
      <AnswerCard tilt={3}>
        <ul>
          <li><Color c="discord">@DJTom3</Color> for initially maintaining the <a href="https://docs.google.com/spreadsheets/d/1FesTb6qkgMz-dCn7YdioRydToWSQNTg1axFEIHU4FF8" target="_blank" rel="noopener noreferrer">Farewell Golden Collectors' List</a>, as it's my primary source of information.</li>
          <li><Color c="discord">@mystral_fox</Color> as the active maintainer of the list.</li>
          <li>The <Color c="celeste">Celeste dev team</Color> for creating such a fantastic game.</li>
          <li>All the players on this list for going above and beyond to complete such a task.</li>
        </ul>
      </AnswerCard>
    {/if}
  </Question>
</section>

<style lang="scss">
  p + p {
    margin-top: 0.4em;
  }

  p.whoops {
    font-style: italic;
    font-size: 0.6em;
  }

  .art-image {
    height: 4em;
    margin-top: 0.5em;
  }

  .icon-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5em;
    margin-top: 1em;

    &.mobile { display: none; }
  }
</style>
