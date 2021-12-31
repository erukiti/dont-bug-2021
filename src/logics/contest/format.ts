import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

export const formatTypeScript = (code: string) => {
  const formatted = prettier.format(code, {
    parser: "babel",
    plugins: [babel],
  });
  return formatted;
};
