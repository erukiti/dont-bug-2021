import { useCallback, useEffect, useState, VFC } from "react";
import { DisplayExamination } from "./DisplayExamination";
import { Editor } from "./editor";
import { safeEval } from "./logics/sandbox";

import { transform } from "@babel/standalone";
import { login, useAuth } from "./logics/firebase/auth";
import "./logics/firebase";

const Results: VFC<{ results: boolean[] }> = ({ results }) => {
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

const App: VFC = () => {
  const [displayName, photoUrl] = useAuth();

  const [code, setCode] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const handleClick = useCallback(() => {
    const run = async () => {
      const fullCode = `
// 出題をコードで記述する

const solve = () => {
  USER_INPUT_CODE;

  return {add}
}

const {add} = solve()

expect(add(1, 2)).toBe(3)
expect(add(-10, 10)).toBe(0)
`.replace("USER_INPUT_CODE", code);
      const res = transform(fullCode, {
        presets: ["typescript"],
        filename: "example.ts",
      });

      const transpilied = res?.code || "";
      const p = (await safeEval(transpilied)) as boolean[];
      setResults(p);
    };
    run();
  }, [safeEval, code]);

  return (
    <div>
      <div>
        <div>{displayName}</div>
        {photoUrl && <img src={photoUrl} />}
      </div>
      <DisplayExamination />
      <Editor value={code} onChange={setCode} onSave={handleClick} />
      <button
        onClick={handleClick}
        className="border-2 p-2 bg-cyan-500 rounded-lg"
      >
        RUN
      </button>
      {!displayName && (
        <button onClick={login} className="border-2 p-2 bg-cyan-500 rounded-lg">
          ログイン
        </button>
      )}
      <Results results={results} />
    </div>
  );
};

export default App;
