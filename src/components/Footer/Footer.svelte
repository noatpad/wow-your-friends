<script>
  import FloatingBerry from "./FloatingBerry.svelte";
  import BrandIcon from '../shared/BrandIcon.svelte';
</script>

<footer>
  <FloatingBerry />
  <div class="links">
    <a href="http://twitter.com/noatpad" target="_blank" rel="noopener noreferrer">
      <BrandIcon name="twitter" hoverColor />
    </a>
    <a href="https://github.com/noatpad/wow-your-friends" target="_blank" rel="noopener noreferrer">
      <BrandIcon name="github" hoverColor />
    </a>
  </div>
  <p>a website made by noatpad</p>
  <p class="footnote">Open sourced on GitHub | Hosted on Netlify</p>
</footer>

<style lang="scss">
  footer {
    width: 100%;
    padding: 2em;
    margin-top: 20vh;
    background: var(--black);
    color: var(--white);
  }

  p { text-align: center; }

  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
    gap: 2em;

    a { padding: 0.5em; }
  }

  .footnote {
    font-size: 0.7em;
    color: var(--gray);
  }
</style>
