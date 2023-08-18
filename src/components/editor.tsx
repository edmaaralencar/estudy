"use client";

import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble,
} from "react-icons/rx";

import "highlight.js/styles/tokyo-night-dark.css";
import { BubbleButton } from "./bubble-button";
import Image from "@tiptap/extension-image";
import { FormEventHandler, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { FloatingMenu } from "./floating-menu";

lowlight.registerLanguage("html", html);

type EditorProps = {
  editable: boolean;
  content: string;
  onChange?: FormEventHandler<HTMLDivElement> | undefined;
};

export function Editor({ editable, content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    editable,
  });

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().clearContent();
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <>
      <EditorContent
        editor={editor}
        className="prose prose-invert prose-violet w-full"
        onChange={onChange}
      />
      {/* {editor && (
        <FloatingMenu editor={editor} />
        // <FloatingMenu
        //   editor={editor}
        //   className="bg-zinc-700 shadow-xl py-2 px-1 border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col gap-1"
        //   shouldShow={({ state }) => {
        //     const { $from } = state.selection;

        //     const currentLineText = $from.nodeBefore?.textContent;

        //     return currentLineText === "/";
        //   }}
        // >
        //   <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
        //     <img
        //       src="http://www.notion.so/images/blocks/text/en-US.png"
        //       alt="Text"
        //       className="w-12 border border-zinc-600 rounded"
        //     />
        //     <div className="flex flex-col text-left ">
        //       <span className="text-sm">Text</span>
        //       <span className="text-xs text-zinc-400">
        //         Just start writing with plain text.
        //       </span>
        //     </div>
        //   </button>
        //   <button
        //     className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
        //     onClick={() =>
        //       editor.chain().focus().toggleHeading({ level: 1 }).run()
        //     }
        //   >
        //     <img
        //       src="http://www.notion.so/images/blocks/header.57a7576a.png"
        //       alt="Text"
        //       className="w-12 border border-zinc-600 rounded"
        //     />
        //     <div className="flex flex-col text-left ">
        //       <span className="text-sm">Heading 1</span>
        //       <span className="text-xs text-zinc-400">
        //         Big section heading.
        //       </span>
        //     </div>
        //   </button>
        //   <button
        //     className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
        //     onClick={addImage}
        //   >
        //     <img
        //       src="http://www.notion.so/images/blocks/header.57a7576a.png"
        //       alt="Text"
        //       className="w-12 border border-zinc-600 rounded"
        //     />
        //     <div className="flex flex-col text-left ">
        //       <span className="text-sm">Imagem</span>
        //       <span className="text-xs text-zinc-400">Imagem padrão.</span>
        //     </div>
        //   </button>
        // </FloatingMenu>
      )} */}
      {editor && (
        <BubbleMenu
          className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
          editor={editor}
        >
          <BubbleButton>
            Text
            <ChevronDown className="w-4 h-4" />
          </BubbleButton>
          <BubbleButton>
            Comment
            <RxChatBubble className="w-4 h-4" />
          </BubbleButton>
          <div className="flex items-center">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive("bold")}
            >
              <RxFontBold className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive("italic")}
            >
              <RxFontItalic className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive("strike")}
            >
              <RxStrikethrough className="w-4 h-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive("code")}
            >
              <RxCode className="w-4 h-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  );
}
