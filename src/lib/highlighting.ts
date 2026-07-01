/* eslint-disable unicorn/switch-case-braces */

interface Language {
  matchers: TokenRuleMatcher[];
}

interface TokenRulePattern {
  pattern: RegExp;
  category: Category;
}

interface TokenRuleGrouping {
  open: string;
  close: string;
  nestable?: boolean;
  category: Category;
}

interface TokenRuleChoices {
  choices: string[];
  category: Category;
}

type TokenRule = TokenRulePattern | TokenRuleGrouping | TokenRuleChoices;

// prettier-ignore
type Category =
  | "error"
  | "name"
  | "keyword"
  | "string"
  | "number"
  | "punctuation"
  | "comment"
  | "whitespace";

interface Token {
  category: Category;
  value: string;
}

class PatternMatcher implements TokenRuleMatcher {
  private readonly pattern: RegExp;
  private readonly category: Category;

  constructor(rule: TokenRulePattern) {
    this.pattern = new RegExp("^" + rule.pattern.source, rule.pattern.flags);
    this.category = rule.category;
  }

  tryMatch(s: string): RuleMatch | undefined {
    let m = s.match(this.pattern);
    if (!m) return undefined;

    return { match: m[0], category: this.category };
  }
}

class NonNestableGroupingMatcher implements TokenRuleMatcher {
  private readonly open: string;
  private readonly close: string;
  private readonly category: Category;

  constructor(rule: TokenRuleGrouping) {
    this.open = rule.open;
    this.close = rule.close;
    this.category = rule.category;
  }

  tryMatch(s: string): RuleMatch | undefined {
    if (!s.startsWith(this.open)) return undefined;

    let close = s.indexOf(this.close);
    if (close === -1) close = s.length;

    let match = s.slice(0, close + this.close.length);
    return { match, category: this.category };
  }
}

class NestableGroupingMatcher implements TokenRuleMatcher {
  private readonly open: string;
  private readonly close: string;
  private readonly category: Category;

  constructor(rule: TokenRuleGrouping) {
    this.open = rule.open;
    this.close = rule.close;
    this.category = rule.category;
  }

  tryMatch(s: string): RuleMatch | undefined {
    if (!s.startsWith(this.open)) return undefined;

    let index = this.open.length;
    let nesting = 1;
    while (index < s.length && nesting > 0) {
      if (s.startsWith(this.open, index)) {
        index += this.open.length;
        ++nesting;
      } else if (s.startsWith(this.close, index)) {
        index += this.close.length;
        --nesting;
      } else {
        ++index;
      }
    }

    return { match: s.slice(0, index), category: this.category };
  }
}

class ChoicesMatcher implements TokenRuleMatcher {
  private readonly choices: string[];
  private readonly category: Category;

  constructor(rule: TokenRuleChoices) {
    this.choices = rule.choices.toSorted((a, b) => {
      let r = b.length - a.length;
      return r === 0 ? a.localeCompare(b) : r;
    });
    this.category = rule.category;
  }

  tryMatch(s: string): RuleMatch | undefined {
    let match = this.choices.find((choice) => s.startsWith(choice));
    if (!match) return undefined;

    return { match, category: this.category };
  }
}

function toMatchers(rules: TokenRule[]): TokenRuleMatcher[] {
  return rules.map((rule): TokenRuleMatcher => {
    if ("pattern" in rule) {
      return new PatternMatcher(rule);
    } else if ("open" in rule && "close" in rule) {
      if (rule.nestable) {
        return new NestableGroupingMatcher(rule);
      } else {
        return new NonNestableGroupingMatcher(rule);
      }
    } else if ("choices" in rule) {
      return new ChoicesMatcher(rule);
    } else {
      throw new Error("unrecognised rule");
    }
  });
}

const languages = Object.freeze({
  d: {
    matchers: toMatchers([
      { pattern: /\/\/.*?(?:\r?\n|\u{2028}|\u{2029})/su, category: "comment" },
      { open: "/*", close: "*/", category: "comment" },
      { open: "/+", close: "+/", nestable: true, category: "comment" },

      {
        choices: `
          { } / /= . .. ... & &= && | |= || - -= -- + += ++ < <= << <<= > >= >>= >>>= >> >>> ! !=
          ( ) [ ] ? , ; : $ = == * *= % %= ^ ^= ^^ ^^= ~ ~= @ =>
        `.split(/\s+/),
        category: "punctuation",
      },

      {
        choices: `
          abstract alias align asm assert auto bool break byte case cast catch char class const
          continue creal dchar debug default delegate deprecated do double else enum export extern
          false final finally float for foreach foreach_reverse function goto if immutable import
          in inout int interface invariant is lazy long macro mixin module new nothrow null out
          override package pragma private protected public pure real ref return scope shared short
          static struct super switch synchronized template this throw true try typeid typeof ubyte
          uint ulong union unittest ushort version void wchar while with __FILE__ __FILE_FULL_PATH__
          __FUNCTION__ __LINE__ __MODULE__ __PRETTY_FUNCTION__ __gshared __parameters __rvalue
          __traits __vector
        `.split(/\s+/),
        category: "keyword",
      },
      { pattern: /[_A-Za-z]\w*/u, category: "name" },

      { pattern: /[ \f\r\n\u{2028}\u{2029}]+/u, category: "whitespace" },
    ]),
  },
} satisfies Record<string, Language>);

interface RuleMatch {
  match: string;
  category: Category;
}

interface TokenRuleMatcher {
  tryMatch(s: string): RuleMatch | undefined;
}

function tokenise(code: string, matchers: TokenRuleMatcher[]): Token[] {
  let tokens = [];

  while (code.length > 0) {
    let ruleMatches = matchers
      .map((rule) => rule.tryMatch(code))
      .filter((rm): rm is RuleMatch => !!rm);

    let longest: RuleMatch = { category: "error", match: code[0] };
    if (ruleMatches.length > 0) {
      longest = ruleMatches[0];
      for (let rm of ruleMatches) {
        if (longest.match.length < rm.match.length) {
          longest = rm;
        }
      }
    }

    tokens.push({ category: longest.category, value: longest.match });
    code = code.slice(longest.match.length);
  }

  return tokens;
}

function escapeForHtmlText(s: string): string {
  return s.replaceAll(/[<>&]/g, (s) => {
    // prettier-ignore
    switch (s) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";

      default:
        throw new Error("unreachable");
    }
  });
}

function toHtml(tokens: Token[]): string {
  let result = "";

  for (let token of tokens) {
    let tag = `hl-${token.category}`;
    result += `<${tag}>${escapeForHtmlText(token.value)}</${tag}>`;
  }

  return result;
}

export function highlight(code: string, language: string): string {
  let lang = (languages as Record<string, Language | undefined>)[language];
  if (!lang) {
    throw new Error(`no highlighting defined for language '${language}'`);
  }

  return toHtml(tokenise(code, lang.matchers));
}
