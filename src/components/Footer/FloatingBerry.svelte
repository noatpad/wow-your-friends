<script>
  import PixelIcon from "../shared/PixelIcon.svelte";
</script>

<div class="berry">
  <PixelIcon
    src="gifs/strawberry.gif"
    alt="A floating straw"
    size="3em"
  />
  <div class="glow" />
</div>

<style>
  .berry {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    animation: float 2.5s ease-in-out infinite forwards;
  }

  .glow {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1px;
    width: 1px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 1.2em .5em #ff8088, 0 0 .6em .3em #ffa9ae50;
  }

  @keyframes float {
    0% { transform: translateY(0%); }
    50% { transform: translateY(-15%); }
    100% { transform: translateY(0%); }
  }
</style>
