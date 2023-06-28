<script>
  import LegendRow from "./LegendRow.svelte";
  import Modal from "../shared/Modal.svelte";
  import PixelIcon from "../shared/PixelIcon.svelte";

  export let show = false;
</script>

<Modal bind:show>
  <div class="types">
    <h3>Legend</h3>
    <p><b>Unverified</b> runs are those with doubtful evidence. You can hover over their name <em>(denoted by an asterisk)</em> for a run's reasoning to be unverified.</p>
    <p><b>Non-202</b> runs are those that obtained the Farewell golden berry, but has not yet collected every berry.</p>
  </div>
  <hr />
  <table>
    <tbody>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/video.png" alt="Video icon" size="1.5em" />
        <p slot="name">Video</p>
        <p slot="details">Contains video proof</p>
      </LegendRow>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/screenshot.png" alt="Screenshot icon" size="1.5em" />
        <p slot="name">Screenshot</p>
        <p slot="details">Contains screenshot proof</p>
      </LegendRow>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/ghostberry.png" alt="Pre-202 icon" size="1.5em" />
        <p slot="name">Pre-202</p>
        <p slot="details">The run's Farewell golden berry was not the final berry, but the player obtained 202 at a later date, referenced in the table</p>
      </LegendRow>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/moonberry.png" alt="Double golden icon" size="1.5em" />
        <p slot="name">Double golden</p>
        <p slot="details">Collects the moonberry on the same run</p>
      </LegendRow>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/key.png" alt="No key skip icon" size="1.5em" />
        <p slot="name">No key skip</p>
        <p slot="details">Complete Power Source without skipping</p>
      </LegendRow>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/pink-crystal.png" alt="Dash trigger skip icon" size="1.5em" />
        <p slot="name">Dash Trigger Skip</p>
        <p slot="details">Execute the dash trigger skip (check FAQ for details)</p>
      </LegendRow>
      <LegendRow>
        <PixelIcon slot="icon" src="icons/eenox.png" alt="Meme run icon" size="1.5em" />
        <p slot="name">Meme run</p>
        <p slot="details" class="meme">Eenox, <a href="https://youtu.be/O6GHZ3Sd410" target="_blank" rel="noopener noreferrer">why?</a></p>
      </LegendRow>
    </tbody>
  </table>
</Modal>

<style lang="scss">
  .types {
    text-align: center;

    * + * { margin-top: 0.3em; }
  }

  hr {
    border-top: 1px solid var(--bg);
    margin: 1em 0;
    opacity: 0.5;
  }

  table {
    width: 100%;
    border-spacing: 1em 4px;
  }

  .meme { font-style: italic; }
</style>
