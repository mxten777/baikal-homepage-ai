import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(
    request,
    async () => {
      try {
        const { id } = await params;
        const body = await request.json();
        const { title, url, order, parentId, visible } = body;

        const existing = await prisma.menu.findUnique({ where: { id } });
        if (!existing) return notFoundResponse("메뉴");

        const menu = await prisma.menu.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(url && { url }),
            ...(order !== undefined && { order }),
            ...(parentId !== undefined && { parentId }),
            ...(visible !== undefined && { visible }),
          },
        });

        return successResponse(menu);
      } catch (error) {
        console.error("Menu UPDATE error:", error);
        return errorResponse("메뉴 수정 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN"]
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(
    request,
    async () => {
      try {
        const { id } = await params;
        const existing = await prisma.menu.findUnique({ where: { id } });
        if (!existing) return notFoundResponse("메뉴");

        await prisma.menu.delete({ where: { id } });
        return successResponse({ message: "메뉴가 삭제되었습니다." });
      } catch (error) {
        console.error("Menu DELETE error:", error);
        return errorResponse("메뉴 삭제 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN"]
  );
}
