<script lang="ts">
  import Seo from "$lib/Seo.svelte";
</script>

<Seo title="About me" description="I’m Emma and this is my silly blog!" />

<h1>About me</h1>

<p>
  Hello! My name is Emmanuelle <emma-pronouns>she/her</emma-pronouns> but everyone calls me Emma. This
  is my blog where I post about programming.
</p>

<p>
  My main computer‑y interests are in the areas of compilers, programming language theory, and web
  design, and that’s probably most of the stuff you’ll find here. But in case you’re still
  interested (for some reason) try opening up these boxes below to get to know me more (all lists
  could change at any time for any reason):
</p>

<details class="flow">
  <summary>Things I love</summary>
  <ul>
    <li>
      <b>Bunnies.</b> I LOVE BUNNIES 🐇🐇🐇🐇🐇🐇🐇🐇🐇🐇 and honestly spiritually I’m a bunny
    </li>
    <li>
      <b>Typography.</b> Ok but seriously it’s so cool. And I can probably identify and differentiate
      more fonts than you
    </li>
    <li>
      <b>Unicode.</b> I could probably spend days reading the spec and using
      <a href="https://util.unicode.org/UnicodeJsps/properties.html">the Unicode Utilities kit.</a>
    </li>
    <li>
      <b>Immersive sims.</b> I have played Deus Ex (2000) far too many times, and the Elder Scrolls games
      are immersive sims also (prove me wrong)
    </li>
    <li>
      <b>Japanese music.</b> It’s kind of the only thing I listen to nowadays, I don’t really know why.
      Not like Vocaloid or anime music, just J-pop, ‑rock, etc
    </li>
    <li>
      <b>Linguistics.</b> I’m really into programming language theory already, and linguistics is
      basically right there looking all sexy and stuff. I used to
      <abbr title="creating brand new languages with all their own words and grammar and stuff"
        >conlang</abbr
      > a lot when I was younger and I still really like learning about languages.
    </li>
    <li>
      <b>Cold weather.</b> I literally cannot think when it’s warm.
    </li>
  </ul>
</details>

<details class="flow">
  <summary>Things I hate</summary>

  <ul>
    <li>
      <b>Websites that make scrolling laggy.</b> Seriously, stop with that shit it’s fucking infuriating
    </li>
    <li>
      <b>Websites that have huge sticky headers.</b> If I want to navigate around your site I can just
      scroll up, don’t cover my precious screen real estate with sticky headers!
    </li>
    <li>
      <b>Footnote overuse.</b> Just put the text inline lol.
    </li>
    <li>
      <b>Deserts.</b> I grew up in a rainforest and I really don’t understand deserts tbh
    </li>
    <li>
      <b>People who don’t find me cute.</b> Because I am 😌
    </li>
    <li><b>Republicans, Tories, Nazis, fascism, bigotry.</b> I mean obviously.</li>
    <li>
      <b>Hot weather.</b> I literally cannot think when it’s warm.
    </li>
  </ul>
</details>

<details class="flow">
  <summary>Metadata</summary>

  <ul>
    <li>I’m 26, born at 3:14 am, which makes me a confirmed cutie π</li>
    <li>I was born in Brazil</li>
    <li>
      My favourite colour is
      <a href="https://en.wikipedia.org/wiki/Cosmic_latte" class="cosmic-latte-link">
        <emma-colour-chip></emma-colour-chip> <span>cosmic latte</span>
      </a>
    </li>
    <li>My name is pronounced /e.ma.nuˈε.li/ in IPA.</li>
  </ul>
</details>

<hr />

<h2>Socials</h2>

<p>Y‑you want to get in contact with me?! Little old me? Okay fine.</p>

<ul role="list" class="fancy-list">
  <li>
    <a href="https://github.com/unleashy">Github</a>
  </li>
  <li>
    <a href="https://bsky.social/profile/bnuuy.bsky.social">Bluesky</a>
  </li>
  <li>
    <a href="mailto:me@emmanuelle.dev">Email</a>
  </li>
</ul>

<p>
  I mean, that’s it really. There are other forms of social media I use but I probably don’t want
  random people contacting me through them so.
</p>

<style>
  emma-pronouns {
    display: inline;
    font-style: italic;
    font-size: var(--t--1);
    vertical-align: super;
    color: var(--c-slight-fg);
  }

  emma-colour-chip {
    display: inline-block;

    height: 1em;
    aspect-ratio: 1;

    margin-inline: 0.35ch;

    background-color: #fff8e7;

    box-shadow: 0 0 0 1px light-dark(var(--c-l-grey-a9), transparent);
    border-radius: 0.15em;

    vertical-align: center;
  }

  /* little hack to make the space between the chip and the link not have an ugly underline */
  .cosmic-latte-link {
    text-decoration-thickness: 0;

    & > span {
      text-decoration: inherit;
      text-decoration-thickness: 1px;
    }
  }
</style>
