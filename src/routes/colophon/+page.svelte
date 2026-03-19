<script lang="ts">
  import Seo from "$lib/Seo.svelte";
</script>

<Seo title="Colophon" description="How this site was built" />

<h1>Colophon</h1>

<emma-flow class="wrapper">
  <aside>
    <p>
      Btw, if you don’t know: a <dfn>
        <a href="https://en.wikipedia.org/wiki/Colophon_(publishing)">colophon</a>
      </dfn> is a little page describing how a publication such as a book or a website was produced.
    </p>
  </aside>

  <emma-flow>
    <p>
      <strong>Typography.</strong> The body text uses
      <a href="http://vollkorn-typeface.com/">Vollkorn</a>, a very nice serif. Initially I was going
      to use <a href="https://fontlibrary.org/en/font/lingua-franca">Lingua Franca</a>, but Vollkorn
      read a little better, I thought.
    </p>

    <p>
      Code snippets use <a href="https://github.com/SorkinType/SplineSansMono">Spline Sans Mono</a>.
    </p>

    <p>
      Type is sized fluidly by a type scale generated at <a href="https://utopia.fyi/">Utopia</a>. I
      hope it looks good!
    </p>
  </emma-flow>

  <p>
    <strong>Colours.</strong> I use <a href="https://www.radix-ui.com/colors">Radix Colours</a>,
    mostly the Pink swatch.
  </p>

  <p>
    <strong>Framework.</strong> I used <a href="https://svelte.dev/docs/kit">SvelteKit</a> to make
    this whole thing. I write everything in HTML including the blog posts, plus my own authored CSS,
    JS, and Svelte components. Blog posts are automatically “indexed” into the home page by
    literally just iterating through the filesystem folders inside the <code>/posts</code> route, there’s
    no database.
  </p>

  <p>
    <strong>Infra.</strong> The website is built by SvelteKit into a
    <a href="https://nodejs.org">Node.js</a>
    server. That server is then proxied by <a href="https://caddyserver.com">Caddy</a>, which
    handles every static file itself such as pre-rendered routes and CSS. (Dynamic stuff goes to the
    Node server; there isn’t any right now though). This little system is hosted on the FreeBSD
    servers at
    <a href="https://www.nearlyfreespeech.net/">NearlyFreeSpeech.net</a> which is a pretty good & cheap
    host!
  </p>

  <p>
    <strong>Deployments.</strong> When I need to update I just <code>git pull</code> and restart the
    servers myself, whatever. The code is mirrored on
    <a href="https://github.com/unleashy/emmanuelle.dev">GitHub</a>.
  </p>

  <p>
    <strong>AI.</strong> I used no AI in making this website.
  </p>
</emma-flow>

<style>
  .wrapper > * {
    --flow-gap: 1.5rem;
  }
</style>
