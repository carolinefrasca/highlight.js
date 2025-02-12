/*
Language: Mojo
Description: Mojo is a compiler and Pythonic programming language for authoring performant and maintainable GPU code (known as kernels) within MAX.
Website: https://www.modular.com/mojo
Category: common
*/

export default function (hljs) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;

  const RESERVED_WORDS = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', '__disable_del', 
    'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 
    'match', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'struct', 'trait', 'try', 'while', 
    'with', 'yield'
  ];

  const BUILT_INS = [
    'print', 'len', 'range', 'int', 'float', 'str', 'bool', 'dict', 'list', 'tuple', 'set', 'sum', 'min', 
    'max', 'abs', 'any', 'all', 'map', 'filter', 'zip', 'enumerate', 'open', 'input', 'super'
  ];

  const LITERALS = ['__debug__', 'Ellipsis', 'False', 'None', 'NotImplemented', 'True'];

  const TYPES = ['Any', 'Callable', 'Dict', 'List', 'Sequence', 'Set', 'Tuple', 'Type', 'Union', 'Int', 'Float', 'Bool', 'String'];

  const KEYWORDS = {
    $pattern: /[A-Za-z_]\w*/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  return {
    name: 'Mojo',
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|\?)|=>/,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: /\bself\b/,
        scope: 'variable.language'
      },
      {
        match: [/\bdef/, /\s+/, IDENT_RE],
        scope: { 1: 'keyword', 3: 'title.function' }
      },
      {
        match: [/\bclass/, /\s+/, IDENT_RE],
        scope: { 1: 'keyword', 3: 'title.class' }
      },
      {
        match: [/\bexcept/, /\s+/, IDENT_RE],
        scope: { 1: 'keyword', 3: 'variable' } // Fixes `except e`
      },
      {
        match: /\bList\[[^\]]+\]|\bTuple\[[^\]]+\]|\bDict\[[^\]]+\]/,
        scope: 'type'
      },
      {
        match: /->\s*[A-Za-z_]\w*/,
        scope: 'type'
      },
      {
        match: /\b[A-Za-z_]\w*\.\w+\b/,
        scope: 'variable.property' // Fixes `Int.MAX`
      },
      {
        className: 'string',
        variants: [
          { begin: /f"/, end: /"/, contains: [hljs.BACKSLASH_ESCAPE, { match: /\{[^}]+\}/, scope: 'subst' }] },
          { begin: /f'/, end: /'/, contains: [hljs.BACKSLASH_ESCAPE, { match: /\{[^}]+\}/, scope: 'subst' }] },
          hljs.QUOTE_STRING_MODE
        ]
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/
      }
    ]
  };
}
