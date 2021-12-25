import { VFC } from "react";
import { remark } from "../logics/markdown";

export const DisplayExamination: VFC = () => {
  const md = "2つの引数をとりその結果を足し算する関数 `add` を作成せよ。";
  return <div>{remark.processSync(md).result}</div>;
};
