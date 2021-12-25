import { unified } from "unified";
import parse from "remark-parse";
import rehype from "remark-rehype";
import toReact from "rehype-react";
import { createElement, VFC } from "react";

// const H2: VFC<React.HTMLAttributes<h2>> = ({ children }) => (
//   <h2 className="text-red-600 text-2xl">{children}</h2>
// );

export const remark = unified().use(parse).use(rehype).use(toReact, {
  createElement,
  // components: {
  //   h2: H2,
  // },
});
