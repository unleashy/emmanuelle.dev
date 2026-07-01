import config from "@unleashy/eslint/svelte";

export default [
  ...(await config(import.meta.dirname)),
  {
    rules: {
      "svelte/no-at-html-tags": "off",
      "unicorn/prefer-https": "off",
    },
  },
];
