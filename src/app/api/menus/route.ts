import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

// 메뉴 목록 조회 (트리 구조)
export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      where: { parentId: null, visible: true },
      include: {
        children: {
          where: { visible: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    });
    return successResponse(menus);
  } catch (error) {
    console.error("Menus GET error:", error);
    return errorResponse("메뉴 목록 조회 중 오류가 발생했습니다.", 500);
  }
}

// 메뉴 추가 (관리자)
export async function POST(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      try {
        const body = await request.json();
        const { title, url, order = 0, parentId, visible = true } = body;

        if (!title || !url) {
          return errorResponse("메뉴 제목과 URL을 입력해주세요.");
        }

        const menu = await prisma.menu.create({
          data: { title, url, order, parentId, visible },
        });

        return successResponse(menu, 201);
      } catch (error) {
        console.error("Menu CREATE error:", error);
        return errorResponse("메뉴 생성 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN"]
  );
}

// 메뉴 순서 일괄 업데이트
export async function PUT(request: NextRequest) {
  return withAuth(
    request,
    async () => {
      try {
        const { menus } = await request.json();

        if (!Array.isArray(menus)) {
          return errorResponse("메뉴 목록 형식이 올바르지 않습니다.");
        }

        const operations = menus.map(
          (menu: { id: string; order: number }) =>
            prisma.menu.update({
              where: { id: menu.id },
              data: { order: menu.order },
            })
        );

        await prisma.$transaction(operations);

        return successResponse({ message: "메뉴 순서가 업데이트되었습니다." });
      } catch (error) {
        console.error("Menu ORDER UPDATE error:", error);
        return errorResponse(
          "메뉴 순서 업데이트 중 오류가 발생했습니다.",
          500
        );
      }
    },
    ["SUPER_ADMIN"]
  );
}
