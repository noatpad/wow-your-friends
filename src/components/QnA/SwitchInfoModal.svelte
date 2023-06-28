<script>
  import Modal from "../shared/Modal.svelte";
  import Color from "../shared/Color.svelte";

  export let show = false;
</script>

<Modal bind:show>
  <h3>Don't have a capture card for the Switch? Listen up!</h3>
  <p>
    While you can easily record and/or stream on every other platform, the Switch has no native streaming capabilities & only allows you to record up to 30 seconds at a time. But fortunately, we can still work with that! There are just a few extra requirements:
  </p>
  <ul>
    <li>If you're unable to record your whole run with a capture card or a camera, you can submit a <em>partial recording</em> made through the Switch's share button.</li>
    <li>This recording must capture the moment of obtaining the <Color c="yellow">golden strawberry</Color>. Preferably hold the Share button right after the screen fades to white.</li>
    <li>Before collecting the berry, <b>open and close the pause menu for about a second</b>. This is important since this will prove that neither <Color c="celeste">Assist</Color> nor <Color c="celeste">Variants</Color> mode were used throughout your run.</li>
    <li><b>A second video is required as proof.</b> This video will simply show your Switch playing th recording mentioned above from the Album applet from the HOME menu. This is to verify that the run was indeed done on a Switch.</li>
  </ul>
  <p>
    With these extra rules in mind, a run can be verified as legitimate!
  </p>
</Modal>

<style>
  * + * { margin-top: 0.4em; }
  h3 { text-align: center; }
  b { text-decoration: underline; }
</style>
