import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

// 게시글 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, email: true } },
        attachments: true,
      },
    });

    if (!post) return notFoundResponse("게시글");

    // 조회수 증가
    await prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    return successResponse(post);
  } catch (error) {
    console.error("Post GET error:", error);
    return errorResponse("게시글 조회 중 오류가 발생했습니다.", 500);
  }
}

// 게시글 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(
    request,
    async (_user) => {
      try {
        const { id } = await params;
        const body = await request.json();
        const { title, content, category, published } = body;

        const existing = await prisma.post.findUnique({ where: { id } });
        if (!existing) return notFoundResponse("게시글");

        const post = await prisma.post.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(content && { content }),
            ...(category && { category }),
            ...(published !== undefined && { published }),
          },
          include: { author: { select: { name: true, email: true } } },
        });

        return successResponse(post);
      } catch (error) {
        console.error("Post UPDATE error:", error);
        return errorResponse("게시글 수정 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN", "EDITOR"]
  );
}

// 게시글 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(
    request,
    async () => {
      try {
        const { id } = await params;
        const existing = await prisma.post.findUnique({ where: { id } });
        if (!existing) return notFoundResponse("게시글");

        await prisma.post.delete({ where: { id } });

        return successResponse({ message: "게시글이 삭제되었습니다." });
      } catch (error) {
        console.error("Post DELETE error:", error);
        return errorResponse("게시글 삭제 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN"]
  );
}
