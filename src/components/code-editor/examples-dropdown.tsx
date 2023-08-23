"use client";

import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { useState } from "react";
import { javascriptDefault } from "@/constants/default-value";

type Args = {
  code: string;
  name: string;
};

type ExamplesDropdownProps = {
  onSelectChange: (args: Args) => void;
  selectedExample: string | null;
  options: Array<{
    id: string;
    name: string;
    code: string;
  }>;
};

export function ExamplesDropdown({
  onSelectChange,
  selectedExample,
  options,
}: ExamplesDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <button
      onClick={() => setOpenDropdown((prevState) => !prevState)}
      className="relative p-4 border-b-2 border-white text-sm font-semibold flex items-center gap-2"
    >
      {selectedExample ?? "Padrão"}
      {openDropdown ? (
        <RxChevronUp color="white" size={20} />
      ) : (
        <RxChevronDown color="white" size={20} />
      )}

      {openDropdown && (
        <>
          <div className="absolute w-full top-12 bg-zinc-600 py-1 rounded-md overflow-y-auto max-h-48 z-50">
            <div
              className="text-start p-2 hover:bg-zinc-700 transition-colors"
              onClick={() =>
                onSelectChange({ name: "Padrão", code: javascriptDefault })
              }
            >
              Padrão
            </div>
            {options.map((option) => (
              <div
                className="text-start p-2 hover:bg-zinc-700 transition-colors"
                onClick={() =>
                  onSelectChange({ name: option.name, code: option.code })
                }
                key={option.id}
              >
                {option.name}
              </div>
            ))}
          </div>
          <div
            className="fixed inset-0 w-screen h-screen z-40"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDropdown(false);
            }}
          ></div>
        </>
      )}
    </button>
  );
}

export default ExamplesDropdown;
