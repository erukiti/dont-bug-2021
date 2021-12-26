import * as monaco from "monaco-editor";
import { createElement, useEffect, useRef } from "react";

type Props = {
  value: string;
  language: string;
  onChange: (value: string) => void;
};

monaco.languages.registerDocumentFormattingEditProvider("typescript", {
  async provideDocumentFormattingEdits(model) {
    const prettier = await import("prettier/standalone");
    const babel = await import("prettier/parser-babel");
    const text = prettier.format(model.getValue(), {
      parser: "babel",
      plugins: [babel],
    });

    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ];
  },
});
export const Editor: React.VFC<Props> = ({ value, onChange, language }) => {
  const height = "600px";

  const element = useRef<undefined | HTMLElement>();
  const editor = useRef<undefined | monaco.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    const resize = () => {
      if (editor.current) {
        editor.current.layout({ height: 0, width: 0 });
        editor.current.layout();
      }
    };
    window.addEventListener("resize", resize);
    setTimeout(() => resize); // push to next tick
    return () => window.removeEventListener("resize", resize);
  });
  useEffect(() => {
    if (element.current) {
      editor.current = monaco.editor.create(element.current, {
        value,
        language,
        tabSize: 2,
        theme: "vs-dark",
        minimap: {
          enabled: false,
        },
      });
      editor.current.onDidChangeModelContent(() => {
        if (editor.current && onChange) onChange(editor.current.getValue());
      });
      editor.current.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        () => {
          editor.current?.getAction("editor.action.formatDocument").run();
        }
      );
    }
    return () => editor.current && editor.current.dispose();
  }, []);

  useEffect(() => {
    if (editor.current && editor.current.getValue() !== value) {
      editor.current.setValue(value);
    }
  }, [value]);

  return <div>{createElement("div", { ref: element, style: { height } })}</div>;
};
