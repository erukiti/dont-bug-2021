import { VFC } from "react";
import { remark } from "~/logics/markdown";

type Props = {
  text: string;
};

export const DisplayExamination: VFC<Props> = ({ text }) => {
  return <div>{remark.processSync(text).result}</div>;
};
