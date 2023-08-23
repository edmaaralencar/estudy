"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import Link from "next/link";
import { OpenSidebarButton } from "./open-sidebar-button";

type Post = {
  id: string;
  name: string;
  category: string;
};

type GroupedPost = {
  category: string;
  posts: Post[];
};

type SidebarProps = {
  posts: Array<Post>;
};

export function Sidebar({ posts }: SidebarProps) {
  const isOpen = useSidebar((state) => state.isOpen);
  const onClose = useSidebar((state) => state.onClose);

  const postsGroupedByCategory = posts.reduce(
    (acc: GroupedPost[], post: Post) => {
      const category = post.category;

      const categoryExists = acc.findIndex(
        (item) => item.category === category
      );

      if (categoryExists > -1) {
        acc[categoryExists].posts.push(post);
      } else {
        acc.push({
          category,
          posts: [post],
        });
      }
      return acc;
    },
    []
  );

  return (
    <aside
      className={cn(
        "hidden lg:block border-r border-r-zinc-700 p-4 fixed top-0 bottom-0 left-0 w-56 z-20 bg-background",
        isOpen ? "block" : "hidden lg:block"
      )}
    >
      <div className="flex gap-2 group lg:hidden">
        <OpenSidebarButton />
      </div>

      <div className="flex flex-col gap-4 mt-8 lg:mt-0">
        {postsGroupedByCategory.map((item) => (
          <div key={item.category} className="flex flex-col gap-2">
            <h2 className="text-lg">{item.category}</h2>

            {item.posts.map((item) => (
              <Link
                href={`/posts/${item.id}`}
                key={item.id}
                className="flex items-center gap-2 p-3 w-full transition-colors cursor-pointer rounded hover:bg-muted"
                onClick={onClose}
              >
                <Circle />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
