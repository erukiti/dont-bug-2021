export const SAMPLE_TESTCODE = `// 出題をコードで記述する

const solve = () => {
  USER_INPUT_CODE;

  return { add }
}

const { add } = solve()

expect(add(1, 2)).toBe(3)
expect(add(-10, 10)).toBe(0)
`;

export const SAMPLE_EXAMINATION = `出題文をMarkdownで作成します。
例: 

2つの引数をとりその結果を足し算する関数 \`add\` を作成せよ。
`;
