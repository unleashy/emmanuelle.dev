<script lang="ts">
  import Post from "$lib/Post.svelte";
  import CodeBlock from "$lib/CodeBlock.svelte";
</script>

<Post
  title="Handcrafting a lexer"
  summary="Building a lexer from scratch, by hand, showing every step."
  date="2026-03-19"
  draft
>
  <p>
    I’ve always enjoyed coding parsers—and their partners in crime lexers—for a long time. I
    honestly think they’re fascinating and I have read far too many books about them.
  </p>
  <p>
    So to share this knowledge I’m going to teach you how to write a lexer, by hand, for any
    language, on any language. I’ll be using <a href="https://en.wikipedia.org/wiki/Lua">Lua</a> as the
    subject for this specific article, because it is a pretty simple language to lex, so it works nicely
    for teaching purposes.
  </p>
  <p>
    For the implementation language (different from the implemented language Lua) I’ll be using
    <a href="https://dlang.org/">D</a>. If you’re not familiar, it should still be eminently
    understandable; D has very traditional syntax, and I’m not going to use any fancy features.
  </p>

  <h2>What is a lexer?</h2>
  <p>
    When you use a compiler (or an interpreter), the code always goes through processing so the
    computer can actually run the code. Usually, the first step is parsing the code, that is,
    figuring out your code’s structure so the compiler knows what to even do.
  </p>
  <p>
    But it’s quite annoying to deal with the raw characters in a file directly! There’s lots of
    little details, like say, ignoring spaces, converting encodings, identifying keywords. So that’s
    what a lexer (also called a scanner or tokeniser) does: it processes the raw characters in a
    file, taking care of each character and identifying, grouping, and categorising them into
    tokens. The tokens are then used by a parser to figure out the larger structure of the code, who
    doesn’t need (or want) to deal with the actual characters the tokens represent.
  </p>
  <p>
    This tandem relationship between a lexer and a parser is the heart of possibly every single
    compiler or interpreter you’ve ever used. Well, you can definitely use just a parser directly on
    a character stream, but the standard is, a lexer processes characters into tokens, the parser
    just deals with tokens. This (usually) creates a very nice separation of concerns.
  </p>

  <h2>How a lexer works</h2>
  <p>
    The core of a lexer is simple in theory. The lexer maintains a pointer or index into the file
    it’s reading, initialised to the start of the file. From that pointer, match for a token, and
    emit the longest token you can find. Update the pointer or index to the end of that emitted
    token, then continue doing this, in a loop, until the file is exhausted.
  </p>
  <CodeBlock
    code={`
        while (!empty) {
            auto token = matchLongestToken(current);
            current = token.end;
            emit(token);
        }
    `}
  />
  <p>
    That description leaves one important question though. How do you “match for the longest token”?
    If you’ve used <a href="https://en.wikipedia.org/wiki/Regular_expression">regular expressions</a
    >
    before, that’s actually exactly how lexers do it. Get a set of regexes, one for each token. Whichever
    matches the longest prefix wins and gets a fully paid vacation to the resort town of Parserness.
  </p>
  <p>
    But! Handcrafting a parser means <strong>hand</strong>crafting it, and this includes the
    regexes! Your nearest library should be ignored, because we’re going to implement the token
    regexes ourselves.
  </p>

  <!--
<p>writing a lexical grammar</p>

<p>what you need to represent tokens</p>

<p>error handling</p>

<p>testing</p>

<p>basic lexing loop</p>

<p>differences between pull-lexing and buffer-lexing</p>

<p>why not regexes</p>

<p>attaching location data to tokens with marks</p>

<p>skipping whitespace/comments</p>

<p>lexing ints</p>

<p>lexing floats</p>

<p>lexing names</p>
-->
</Post>
