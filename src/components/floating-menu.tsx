"use client";

import { Editor, FloatingMenu as TipTapFloatingMenu } from "@tiptap/react";
import { UploadImageModal } from "./upload-image-modal";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FloatingMenuProps = {
  editor: Editor;
};

export function FloatingMenu({ editor }: FloatingMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <TipTapFloatingMenu
      editor={editor}
      className={cn(
        "bg-muted shadow-xl py-2 px-1 shadow-black/20 rounded-lg overflow-y-auto max-h-96 overflow-hidden flex-col gap-1",
        open ? "hidden" : "flex"
      )}
      shouldShow={({ state }) => {
        const { $from } = state.selection;

        const currentLineText = $from.nodeBefore?.textContent;

        if (open) {
          return false;
        }

        return currentLineText === "/" && !open;
      }}
    >
      <button
        type="button"
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background"
      >
        <img
          src="http://www.notion.so/images/blocks/text/en-US.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Texto</span>
          <span className="text-xs text-zinc-400">
            Comece a escrever com um texto simples.
          </span>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type="button"
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background"
      >
        <img
          src="https://www.notion.so/images/blocks/header.57a7576a.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Heading 1</span>
          <span className="text-xs text-zinc-400">Texto grande para seção</span>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background"
      >
        <img
          src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Heading 2</span>
          <span className="text-xs text-zinc-400">Texto medio para seção</span>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background"
      >
        <img
          src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Heading 3</span>
          <span className="text-xs text-zinc-400">
            Texto pequeno para seção
          </span>
        </div>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        type="button"
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background"
      >
        <img
          src="https://www.notion.so/images/blocks/code.a8b201f4.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Bloco de Código</span>
          <span className="text-xs text-zinc-400">
            Bloco para códigos grandes
          </span>
        </div>
      </button>
      <button
        onClick={() => {
          setOpen(true);
          editor.chain().clearContent();
        }}
        type="button"
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background"
      >
        <img
          src="http://www.notion.so/images/blocks/text/en-US.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Imagem</span>
          <span className="text-xs text-zinc-400">
            Imagem de tamanho padrão
          </span>
        </div>
      </button>
      <UploadImageModal open={open} onOpenChange={setOpen} editor={editor} />
      {/* <button
      className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
      onClick={addImage}
    >
      <img
        src="http://http://www.notion.so/images/blocks/text/en-US.png"
        alt="Text"
        className="w-12 border border-zinc-600 rounded"
      />
      <div className="flex flex-col text-left ">
        <span className="text-sm">Imagem</span>
        <span className="text-xs text-zinc-400">Imagem padrão.</span>
      </div>
    </button> */}
    </TipTapFloatingMenu>
  );
}
