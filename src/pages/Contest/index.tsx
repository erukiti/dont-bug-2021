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
  const contest = useContest(contestId);
  const [errorMessage, setErrorMessage] = useState("");

  const users = contest
    ? Object.keys(contest.users).map((id) => {
        return contest.users[id];
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
          status: { code, results, updatedAt: new Date() },
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
    <div>
      <div>
        <div>{user.displayName}</div>
        {user.photoUrl && (
          <img src={user.photoUrl} className="rounded-full w-[48px] h-[48px]" />
        )}
      </div>
      <Online users={users} />
      <button
        onClick={handleClick}
        className="border-2 px-2 py-1  bg-cyan-500 rounded-lg"
      >
        RUN
      </button>
      <ErrorMessage errorMessage={errorMessage} />
      <Results results={myResults} />
      <DisplayExamination text={contest.examination} />
      <Editor value={code} onChange={setCode} language="typescript" />
    </div>
  );
};
