import { useCallback, useEffect, useState, VFC } from "react";
import { DisplayExamination } from "~/parts/DisplayExamination";
import { Editor } from "~/parts/Editor";
import { safeEval } from "~/logics/sandbox";

import { transform } from "@babel/standalone";
import { Results } from "~/parts/Results";
import { useAuth } from "~/logics/auth";
import { useMatch } from "react-location";
import { useContest, useUpdateUserStatus } from "~/logics/firebase/contest";
import { Online } from "~/parts/Online";
import { ErrorMessage } from "~/parts/Error";

export const Contest: VFC = () => {
  const { contestId } = useMatch().params;
  const user = useAuth();
  const [contest, contestUsers] = useContest(contestId);
  const [errorMessage, setErrorMessage] = useState("");

  const users = contestUsers
    ? Object.keys(contestUsers).map((id) => {
        return contestUsers[id];
      })
    : [];

  const testCode = contest?.testCode || "";
  const updateUserStatus = useUpdateUserStatus();

  const [code, setCode] = useState("");
  const [myResults, setMyResults] = useState<boolean[]>([]);
  const handleClick = useCallback(() => {
    const run = async () => {
      setErrorMessage("");
      if (!code) {
        return;
      }

      try {
        // コンパイルエラーを code 単独で出すため
        transform(code, {
          presets: ["typescript"],
          filename: "dont-bug-2021.ts",
        });

        // 実行に必要なコードをまとめてコンパイル
        const transpilied =
          transform(testCode.replace("USER_INPUT_CODE", code), {
            presets: ["typescript"],
            filename: "dont-bug-2021.ts",
          }).code || "";

        const results = await safeEval(transpilied);
        if (!Array.isArray(results)) {
          setErrorMessage(results);
          return;
        }

        if (!Array.isArray(results) || results.length === 0) {
          return;
        }

        setMyResults(results);
        updateUserStatus(contestId, user.uid, {
          displayName: user.displayName,
          photoUrl: user.photoUrl,
          uid: user.uid,
          status: { code, results },
        });
      } catch (err: any) {
        if ("message" in err) {
          setErrorMessage(err.message);
        }
      }
    };
    run();
  }, [safeEval, code, testCode, contestId, user]);

  if (!contest) {
    return <div>contest loading</div>;
  }

  return (
    <div className="flex">
      <div className="w-3/5 px-2">
        <div className="bg-[#1e1e1e] px-2 pt-2 flex items-center gap-3">
          <button
            onClick={handleClick}
            className="border-2 px-4 py-1 text-lg border-[#cc711d] text-[#cc711d] rounded-lg hover:text-[#bf0008] hover:cursor-pointer"
          >
            Run
          </button>
          <Results results={myResults} />
        </div>
        <div className="py-2 bg-[#1e1e1e]">
          <Editor value={code} onChange={setCode} language="typescript" />
        </div>
      </div>
      <div className="w-2/5 px-2">
        <DisplayExamination text={contest.examination} />
        {errorMessage && (
          <div className="border-[#bf0008] border-2 text-sm p-1 mt-5">
            <ErrorMessage errorMessage={errorMessage} />
          </div>
        )}
        <div className="mt-5">
          <Online users={users} />
        </div>
      </div>
    </div>
  );
};
