import { useCallback, useEffect, useState, VFC } from "react";
import { DisplayExamination } from "~/parts/DisplayExamination";
import { Editor } from "~/parts/Editor";
import { safeEval } from "~/logics/sandbox";

import { transform } from "@babel/standalone";
import { Results } from "~/parts/Results";
import { useAuth } from "~/logics/auth";
import { useMatch } from "react-location";
import { useContest } from "~/logics/firebase/contest";

export const Contest: VFC = () => {
  const { contestId } = useMatch().params;
  const { displayName, photoUrl } = useAuth();
  const contest = useContest(contestId);
  const testCode = contest?.testCode || "";

  const [code, setCode] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const handleClick = useCallback(() => {
    const run = async () => {
      const fullCode = testCode.replace("USER_INPUT_CODE", code);
      const res = transform(fullCode, {
        presets: ["typescript"],
        filename: "example.ts",
      });

      const transpilied = res?.code || "";
      const p = (await safeEval(transpilied)) as boolean[];
      setResults(p);
    };
    run();
  }, [safeEval, code, testCode]);

  if (!contest) {
    return <div>contest loading</div>;
  }

  return (
    <div>
      <div>
        <div>{displayName}</div>
        {photoUrl && <img src={photoUrl} />}
      </div>
      <button
        onClick={handleClick}
        className="border-2 px-2 py-1  bg-cyan-500 rounded-lg"
      >
        RUN
      </button>
      <Results results={results} />
      <DisplayExamination text={contest.examination} />
      <Editor value={code} onChange={setCode} language="typescript" />
    </div>
  );
};
