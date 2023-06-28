<script lang="ts">
  export let src: string;
  export let alt: string;
  export let size: string | number = '1.2em';
  $: height = (typeof size === 'number') ? `${size}px` : size;
</script>

<img {src} {alt} style:height>

<style>
  img {
    height: 1.2em;
    /* Image renders more like pixel art (which is what I need) */
    image-rendering: optimizeSpeed;             /* STOP SMOOTHING, GIVE ME SPEED */
    image-rendering: -moz-crisp-edges;          /* Firefox */
    image-rendering: -o-crisp-edges;            /* Opera */
    image-rendering: -webkit-optimize-contrast; /* Chrome (and eventually Safari) */
    image-rendering: pixelated;                 /* Chrome */
    image-rendering: optimize-contrast;         /* CSS3 Proposed */
    -ms-interpolation-mode: nearest-neighbor;   /* IE8+ */
  }
</style>
