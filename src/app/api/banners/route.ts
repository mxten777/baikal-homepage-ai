import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

// 배너 목록 조회
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    return successResponse(banners);
  } catch (error) {
    console.error("Banners GET error:", error);
    return errorResponse("배너 목록 조회 중 오류가 발생했습니다.", 500);
  }
}

// 배너 생성 (관리자)
export async function POST(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      try {
        const body = await request.json();
        const { title, imageUrl, linkUrl, order = 0, active = true } = body;

        if (!title || !imageUrl) {
          return errorResponse("배너 제목과 이미지 URL을 입력해주세요.");
        }

        const banner = await prisma.banner.create({
          data: { title, imageUrl, linkUrl, order, active },
        });

        return successResponse(banner, 201);
      } catch (error) {
        console.error("Banner CREATE error:", error);
        return errorResponse("배너 생성 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN"]
  );
}
