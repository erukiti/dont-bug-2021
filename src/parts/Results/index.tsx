import { VFC } from "react";

type Props = { results: boolean[] };

export const Results: VFC<Props> = ({ results }) => {
  return (
    <>
      <div className="flex gap-1">
        {results.map((res, i) => (
          <span
            key={i}
            className={
              res
                ? "bg-blue-500 rounded-full w-5 h-5 inline-block"
                : "bg-red-500 rounded-full w-5 h-5 inline-block"
            }
          />
        ))}
      </div>
      <div>{}</div>
    </>
  );
};
