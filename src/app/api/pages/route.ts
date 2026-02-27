import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
} from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

// 페이지 목록 조회
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(pages);
  } catch (error) {
    console.error("Pages GET error:", error);
    return errorResponse("페이지 목록 조회 중 오류가 발생했습니다.", 500);
  }
}

// 페이지 생성 (관리자)
export async function POST(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      try {
        const body = await request.json();
        const { title, slug, content, metaTitle, metaDescription } = body;

        if (!title || !slug || !content) {
          return errorResponse("제목, 슬러그, 내용을 입력해주세요.");
        }

        const existing = await prisma.page.findUnique({ where: { slug } });
        if (existing) {
          return errorResponse("이미 사용 중인 슬러그입니다.");
        }

        const page = await prisma.page.create({
          data: { title, slug, content, metaTitle, metaDescription },
        });

        return successResponse(page, 201);
      } catch (error) {
        console.error("Page CREATE error:", error);
        return errorResponse("페이지 생성 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN", "EDITOR"]
  );
}
