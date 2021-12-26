import { useCallback, useState, VFC } from "react";
import { useNavigate } from "react-location";
import { useCreateContest } from "~/logics/firebase/contest";
import { Editor } from "~/parts/Editor";
import { SAMPLE_EXAMINATION, SAMPLE_TESTCODE } from "./sample";

export const CreatePage: VFC = () => {
  const navigate = useNavigate();
  const [examination, setExamination] = useState(SAMPLE_EXAMINATION);
  const [testCode, setTestCode] = useState(SAMPLE_TESTCODE);
  const createContest = useCreateContest();
  const handleClick = useCallback(async () => {
    console.log(11);
    const contestId = await createContest({
      examination,
      testCode,
      users: {},
    });
    navigate({ to: `/${contestId}` });
  }, [examination, testCode]);

  return (
    <div>
      <button onClick={handleClick}>save</button>
      <div>出題文</div>
      <Editor
        value={examination}
        onChange={setExamination}
        language="markdown"
      />
      <div>テスト用コード</div>
      <Editor value={testCode} onChange={setTestCode} language="typescript" />
    </div>
  );
};
