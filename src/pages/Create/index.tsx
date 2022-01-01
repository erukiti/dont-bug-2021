import { useCallback, useState, VFC } from "react";
import { useNavigate } from "react-location";
import { useCreateContest } from "~/logics/firebase/contest";
import { PrimaryButton } from "~/parts/Button/PrimaryButton";
import { Editor } from "~/parts/Editor";
import { SAMPLE_EXAMINATION, SAMPLE_TESTCODE } from "./sample";

export const CreatePage: VFC = () => {
  const navigate = useNavigate();
  const [examination, setExamination] = useState(SAMPLE_EXAMINATION);
  const [testCode, setTestCode] = useState(SAMPLE_TESTCODE);
  const createContest = useCreateContest();
  const handleClick = useCallback(async () => {
    const contestId = await createContest({
      examination,
      testCode,
    });
    navigate({ to: `/${contestId}` });
  }, [examination, testCode]);

  return (
    <div className="mt-5 mx-5">
      <PrimaryButton onClick={handleClick}>save</PrimaryButton>
      <div>出題文</div>
      <Editor
        value={examination}
        onChange={setExamination}
        language="markdown"
        height="250px"
      />
      <div>テスト用コード</div>
      <Editor
        value={testCode}
        onChange={setTestCode}
        language="typescript"
        height="400px"
      />
    </div>
  );
};
