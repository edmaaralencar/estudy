"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

export function OpenSidebarButton() {
  const onOpen = useSidebar((state) => state.onOpen);
  const onClose = useSidebar((state) => state.onClose);
  const open = useSidebar((state) => state.isOpen);

  function handleToggleSidebar() {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  }

  return (
    <Button onClick={handleToggleSidebar} variant="ghost" className="block lg:hidden">
      <Menu />
    </Button>
  );
}
