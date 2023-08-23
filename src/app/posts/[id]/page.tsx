import getCurrentUser from "@/actions/get-current-user";
import { CodeEditor } from "@/components/code-editor";
import { Editor } from "@/components/editor";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      codeExamples: true,
    },
  });

  const user = await getCurrentUser();

  if (!post) {
    return null;
  }

  if (post.status !== "approved") {
    if (user && user?.role !== "admin" || !user) {
      return redirect("/");
    }
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <Editor content={post?.content} editable={false} />
      <CodeEditor codeExamples={post.codeExamples} />
    </div>
  );
}
