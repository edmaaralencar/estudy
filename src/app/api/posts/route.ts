import getCurrentUser from "@/actions/get-current-user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import PostCreatedEmailTemplate from "@/components/emails/post-created-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const postSchema = z.object({
  name: z.string(),
  category: z.string(),
  content: z.string(),
  codeExamples: z.array(
    z.object({
      name: z.string(),
      example: z.string(),
    })
  ),
});

const updateSchema = z.object({
  postId: z.string().uuid(),
  status: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  const { name, category, content, codeExamples } = postSchema.parse(body);

  const post = await prisma.post.create({
    data: {
      name,
      category,
      content,
      status: "requested",
      userId: user.id,
    },
  });

  for (const code of codeExamples) {
    await prisma.postCodeExample.create({
      data: {
        name: code.name,
        code: code.example,
        postId: post.id,
      },
    });
  }

  await resend.sendEmail({
    from: "onboarding@resend.dev",
    to: "edmaaralencar1@gmail.com",
    subject: `Criação da postagem ${post.name}`,
    react: PostCreatedEmailTemplate({
      createdByEmail: String(user.email),
      createdByName: String(user.name),
      postCategory: post.category,
      postLink: `http://localhost:3000/posts/${post.id}`,
      postName: post.name,
    }),
  });

  return NextResponse.json("Post criado com sucesso.");
}

export async function PUT(request: Request) {
  const body = await request.json();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.error();
  }

  if (user.role !== "admin") {
    return NextResponse.error();
  }

  const { postId, status } = updateSchema.parse(body);

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return NextResponse.error();
  }

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      status,
    },
  });

  return NextResponse.json("Post criado com sucesso.");
}
