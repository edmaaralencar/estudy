"use client";

import { Editor, FloatingMenu as TipTapFloatingMenu } from "@tiptap/react";
import { Popover, PopoverContent } from "./ui/popover";

type FloatingMenuProps = {
  editor: Editor;
};

export function FloatingMenu({ editor }: FloatingMenuProps) {
  return (
    <TipTapFloatingMenu
      editor={editor}
      className="bg-muted shadow-xl py-2 px-1 shadow-black/20 rounded-lg overflow-hidden flex flex-col gap-1"
      shouldShow={({ state }) => {
        const { $from } = state.selection;

        const currentLineText = $from.nodeBefore?.textContent;

        return currentLineText === "/";
      }}
    >
      <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background">
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
      <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-background">
        <img
          src="http://www.notion.so/images/blocks/text/en-US.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left ">
          <span className="text-sm">Heading 1</span>
          <span className="text-xs text-zinc-400">Texto grande para seção</span>
        </div>
      </button>
      {/* <button
      className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
      onClick={addImage}
    >
      <img
        src="http://www.notion.so/images/blocks/header.57a7576a.png"
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
