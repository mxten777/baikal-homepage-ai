import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

// 슬러그로 페이지 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) return notFoundResponse("페이지");
    return successResponse(page);
  } catch (error) {
    console.error("Page GET error:", error);
    return errorResponse("페이지 조회 중 오류가 발생했습니다.", 500);
  }
}

// 페이지 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(
    request,
    async () => {
      try {
        const { slug } = await params;
        const body = await request.json();
        const { title, content, metaTitle, metaDescription, published } = body;

        const existing = await prisma.page.findUnique({ where: { slug } });
        if (!existing) return notFoundResponse("페이지");

        const page = await prisma.page.update({
          where: { slug },
          data: {
            ...(title && { title }),
            ...(content && { content }),
            ...(metaTitle !== undefined && { metaTitle }),
            ...(metaDescription !== undefined && { metaDescription }),
            ...(published !== undefined && { published }),
          },
        });

        return successResponse(page);
      } catch (error) {
        console.error("Page UPDATE error:", error);
        return errorResponse("페이지 수정 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN", "EDITOR"]
  );
}

// 페이지 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(
    request,
    async () => {
      try {
        const { slug } = await params;
        const existing = await prisma.page.findUnique({ where: { slug } });
        if (!existing) return notFoundResponse("페이지");

        await prisma.page.delete({ where: { slug } });
        return successResponse({ message: "페이지가 삭제되었습니다." });
      } catch (error) {
        console.error("Page DELETE error:", error);
        return errorResponse("페이지 삭제 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN"]
  );
}
