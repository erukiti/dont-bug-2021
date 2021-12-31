import { safeEval } from "~/logics/sandbox";

import { transform } from "@babel/standalone";

export type ContestResultType =
  | undefined
  | "Compile Error"
  | "Testing Failed"
  | "Execution Timed Out"
  | "Success"
  | "Unknown Error";

export const CONTEST_RESULT_TYPES: ContestResultType[] = [
  "Compile Error",
  "Testing Failed",
  "Execution Timed Out",
  "Success",
  "Unknown Error",
];

export type ContestResult = {
  type: ContestResultType;
  message?: string;
};

export const runContestJs = async (
  code: string,
  testCode: string
): Promise<ContestResult> => {
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
    if (!Array.isArray(results) || results.length === 0) {
      return { type: "Unknown Error" };
    }

    const nSuccess = results.filter((res) => res).length;
    if (nSuccess !== results.length) {
      return {
        type: "Testing Failed",
        message: `Testing Failed ${nSuccess}/${results.length}`,
      };
    }

    return { type: "Success" };
  } catch (err: any) {
    if ("message" in err) {
      return {
        type: "Compile Error",
        message: err.message,
      };
    }
    console.log(err);
    return {
      type: "Unknown Error",
    };
  }
};
