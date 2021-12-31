import { useCallback, useEffect, useState, VFC } from "react";
import { DisplayExamination } from "~/parts/DisplayExamination";
import { Editor } from "~/parts/Editor";

import { useAuth } from "~/logics/auth";
import { useMatch } from "react-location";
import { useContest, useUpdateUserStatus } from "~/logics/firebase/contest";
import { Online } from "~/parts/Online";
import { ErrorMessage } from "~/parts/Error";
import { ContestResultType, runContestJs } from "~/logics/contest";
import { formatTypeScript } from "~/logics/contest/format";

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
  const [myResult, setMyResult] = useState<ContestResultType>(undefined);

  useEffect(() => {
    if (!code) {
      const myStatus = users.find((u) => u.uid === user.uid);
      if (myStatus?.status.code) {
        setCode(myStatus.status.code);
      }
    }
  }, [code, users, user]);

  const handleClick = useCallback(() => {
    const run = async () => {
      if (!code) {
        return;
      }
      const formatted = formatTypeScript(code);
      setCode(formatted);
      const res = await runContestJs(formatted, testCode);
      console.log(res);
      setMyResult(res.type);
      updateUserStatus(contestId, user.uid, {
        displayName: user.displayName,
        photoUrl: user.photoUrl,
        uid: user.uid,
        status: { code: formatted, resultType: res.type },
      });
      setErrorMessage(res.message || "");
    };
    run();
  }, [code, testCode, contestId, user]);

  if (!contest) {
    return <div>contest loading</div>;
  }

  return (
    <div className="flex">
      <div className="w-3/5 px-2">
        <div className="bg-[#1e1e1e] px-2 pt-2 flex items-center gap-3">
          <button
            onClick={handleClick}
            className="border-2 px-4 py-1 text-lg border-[#cc711d] text-[#cc711d] rounded-lg hover:bg-[#cc711d] hover:text-gray-100 hover:cursor-pointer duration-100"
          >
            Run
          </button>
          <div className="text-white">{myResult}</div>
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
