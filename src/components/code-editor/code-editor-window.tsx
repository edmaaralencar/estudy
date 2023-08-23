"use client";

import Editor from "@monaco-editor/react";

type CodeEditorWindowProps = {};

const CodeEditorWindow = ({ onChange, language, code, theme }: any) => {

  const handleEditorChange = (value: any) => {
    onChange("code", value);
  };

  return (
    <div className="overlay w-full h-full shadow-4xl">
      <Editor
        width={`100%`}
        language={language || "javascript"}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
