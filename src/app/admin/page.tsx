import getCurrentUser from "@/actions/get-current-user";
import { redirect } from "next/navigation";
import { PostsTable } from "./components/posts-table";
import prisma from "@/lib/prisma";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  if (currentUser.role !== "admin") {
    return redirect("/");
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      codeExamples: true,
      content: true,
      status: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl">Lista de Postagens</h1>
      <PostsTable posts={posts} />
    </div>
  );
}
