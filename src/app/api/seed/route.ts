import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await prisma.user.findUnique({
    where: {
      email: "edmaaralencar1@gmail.com",
    },
  });

  if (!user) {
    return NextResponse.error();
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: "admin",
    },
  });

  return NextResponse.json({ message: "Usuário promovido a administrador!" });
}
