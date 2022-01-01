import * as monaco from "monaco-editor";
import { createElement, useEffect, useRef } from "react";
import { formatTypeScript } from "~/logics/contest/format";

type Props = {
  value: string;
  language: string;
  onChange: (value: string) => void;
  height: string;
};

monaco.languages.registerDocumentFormattingEditProvider("typescript", {
  async provideDocumentFormattingEdits(model) {
    const text = formatTypeScript(model.getValue());

    return [
      {
        range: model.getFullModelRange(),
        text,
      },
    ];
  },
});

export const Editor: React.VFC<Props> = ({
  value,
  onChange,
  language,
  height,
}) => {
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
        fontSize: 14,
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
