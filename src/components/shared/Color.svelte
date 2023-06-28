<script lang="ts">
  import { colors, type Color } from "../theme";

  export let c: Color;
  export let bold = false;
  $: color = colors[c];
</script>

<span class:bold style:color>
  <slot />
</span>

<style>
  .bold { font-weight: bold; }
</style>
