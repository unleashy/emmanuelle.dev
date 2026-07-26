<script lang="ts">
  import Post from "$lib/Post.svelte";
  import CodeBlock from "$lib/CodeBlock.svelte";
  import Btw from "$lib/Btw.svelte";
</script>

<Post
  title="Pull lexing"
  summary="Spilling the guts of the lexer out so the parser can play with the giblets"
  date="2026-07-24"
  draft
>
  <p>
    When parsing a programming language, you usually call into a lexer that will read the source
    input and yield a stream of tokens. These tokens will then be used by a parser to figure out the
    structure of your code.
  </p>

  <p>
    These tokens are usually modelled with simple, and frequently small, types; these types are
    gonna be used everywhere, and you don’t want a compiler to use any more memory than it needs to.
  </p>

  <p>
    The average token type looks like a
    <a href="https://en.wikipedia.org/wiki/Tagged_union">tagged union</a>, which is like a struct of
    types with a tag telling you which type is currently “valid”:
  </p>

  <CodeBlock
    language="d"
    code={`
      enum Tag {
          End,
          Integer,
          Float,
          String,
          Punctuation,
          // ...
      }

      union Value {
          int i;
          double d;
          string s;
          // ...
      }

      struct Token {
          Tag tag;
          Value value;
          Metadata meta;
      }
    `}
  />

  <p>
    This works great! But some languages don’t provide good support for this kind of data structure.
  </p>

  <p>
    For example, in Java, you’d probably replace this with a Token abstract class, and have multiple
    child classes (TokenEnd, TokenInteger, TokenPunctuation, etc.) inheriting from Token.
  </p>

  <p>
    To be clear: this works just fine! But it’s also very heavyweight. Every time the lexer yields a
    token, it needs to allocate the token. Every time the parser uses a token, it needs to go
    through a reference, which is an extra memory jump.
  </p>

  <p>
    This is not a problem at all if this isn’t done very often. But parsing in a compiler is a
    <strong>very</strong> hot code path, and compilers are very, <strong>very</strong> persnickety about
    performance, and every little millisecond wrung out of the code counts.
  </p>

  <p>
    The usual solution is to use a plain old Token class or struct. It only has the token tag, and a
    string <dfn>lexeme</dfn>: a slice into the original source input. Then, when the parser needs
    to, it takes the string lexeme and re-parses it to extract the value it needs.
  </p>

  <p>
    And yes, this does work. But I’ve always found it kind of unpleasant. The parser is doing work
    the lexer could have already done. Thankfully, there’s a pretty good alternative.
  </p>

  <h2>Pull lexing</h2>

  <p>
    Cutting straight to the chase, the main concept is: have the parser keep a reference to the
    lexer, and parse as normal. When it needs a token, quite literally call a method on the lexer
    asking for the kind of token you expect.
  </p>

  <p>
    Now, instead of the lexer returning a stream of tokens, the lexer <strong>is</strong> the stream of
    tokens.
  </p>

  <p>Our token type now becomes a generic struct!</p>

  <CodeBlock
    language="c#"
    code={`
      struct Token<T> {
          T Value;
          Metadata Meta;
      }
    `}
  />

  <p>And our lexer will look like this:</p>

  <CodeBlock
    language="c#"
    code={`
      class Lexer {
          Token<int>?         NextInteger();
          Token<double>?      NextFloat();
          Token<string>?      NextString();
          Token<Punctuation>? NextPunctuation();
          // ...
      }
    `}
  />

  <p>
    Since the parser always knows what tokens are valid at a given point, it can trivially call the
    appropriate method when it needs a specific token. And if an expected token is not present, the
    parser may call an error handler on the lexer that will produce a precise error message, or
    whatever.
  </p>

  <p>
    This is <strong>pull parsing</strong>. You pull what you want out of the parser (which is the
    lexer in this case!), instead of it giving you what you think you want. Kinda like a claw
    machine at the arcade. But like. Much, much easier, painless really, etc.
  </p>

  <h2>Actually implementing it</h2>

  <p>
    First, let’s inspect the structure of a traditional lexer to understand how it works normally.
    We can start from the most-encapsulated lexer possible and progressively deconstruct it to get
    to our pull lexer.
  </p>

  <p>
    The <strong>Tokeniser</strong> is the most-encapsulated lexer. It takes in a string, and outputs a
    list of tokens upfront. This is a very common structure for simple hand-written lexers.
  </p>

  <CodeBlock
    language="c#"
    code={`
        static List<Token> Tokenise(ReadOnlySpan<char> input)
        {
            List<Token> tokens = [];

            while (true) {
                input = TrimSpaces(input);
                if (input.IsEmpty) break;

                Token? token = MatchToken(input);
                if (token is null) throw SomeError(token);

                tokens.Add(token);
                input = input.Slice(token.Length);
            }

            return tokens;
        }
    `}
  />

  <p>
    Unwrap the outer loop and you get the most common lexer type for automatically generated lexers,
    the <strong>Iterator</strong>. Instead of getting every token at once in a list, you query the
    lexer for the next token in the list, on-demand.
  </p>

  <CodeBlock
    language="c#"
    code={`
        // ... within a Lexer class ...
        Token Next()
        {
            _input = TrimSpaces(_input);
            if (_input.IsEmpty) return EndToken();

            Token? token = MatchToken(_input);
            if (token is null) throw SomeError(token);

            input = input.Slice(token.Length);
            return token;
        }
    `}
  />

  <p>
    Note how this is nearly the same structure, but with the outer loop being driven by the caller.
  </p>

  <Btw>
    In languages with
    <a href="https://en.wikipedia.org/wiki/Generator_(computer_programming)">generator</a> support
    like C#, Javascript, Ruby, etc. you can trivially transform a tokeniser into an iterator by
    replacing
    <code>return</code>
    with <code>yield</code> (or its equivalent in your language of choice).
  </Btw>

  <p>
    De-encapsulate one more time, letting the caller control token matching: that’s the
    <strong>Pull</strong> lexer.
  </p>

  <p>
    For every <code>Next«Tag»</code> method, you do the same steps you’d do in the iterator—trim spaces,
    check for end, match token—but specialise the matching step to the token the caller wants:
  </p>

  <CodeBlock
    language="c#"
    code={`
        // ... within a Lexer class ...
        Token<T>? Next«Tag»()
        {
            _input = TrimSpaces(_input);
            if (_input.IsEmpty) return null; // empty? no match

            Token<T>? token = MatchToken«Tag»(_input);
            if (token is null) return null; // not an integer token? no match

            input = input.Slice(token.Length);
            return token;
        }
    `}
  />

  <p>
    Create a method like this for every sort of token you have and that’s it! You may call each
    method at will,
  </p>

  <p>
    And yes, you can go the other way. If you only have a pull lexer, and you want a tokeniser for
    some reason, you can build it on top of the pull lexer, because
    <strong>the pull lexer is the most primitive version of a lexer.</strong> (This does require creating
    a Token union again!)
  </p>

  <CodeBlock
    language="c#"
    code={`
        static List<Token> Tokenise(ReadOnlySpan<char> input)
        {
            List<Token> tokens = [];
            PullLexer lexer = new();

            while (true) {
                // Check every token until you find a match.
                Token? token =
                  lexer.NextInteger()?.ToUnion()
                  ?? lexer.NextString()?.ToUnion()
                  ?? lexer.NextPunctuation()?.ToUnion();
                  // ...

                if (token is null) break;
                tokens.Add(token);
            }

            return tokens;
        }
    `}
  />
</Post>
