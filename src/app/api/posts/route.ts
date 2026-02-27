import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { withAuth } from "@/lib/middleware";

// 게시글 목록 (공개 + 관리자)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "NOTICE";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const where = {
      category: category as "NOTICE" | "ARCHIVE",
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { name: true, email: true } },
          attachments: { select: { id: true, fileName: true, fileSize: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return successResponse({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Posts GET error:", error);
    return errorResponse("게시글 목록 조회 중 오류가 발생했습니다.", 500);
  }
}

// 게시글 작성 (관리자)
export async function POST(request: NextRequest) {
  return withAuth(
    request,
    async (user) => {
      try {
        const body = await request.json();
        const { title, content, category = "NOTICE", published = false } = body;

        if (!title || !content) {
          return errorResponse("제목과 내용을 입력해주세요.");
        }

        const post = await prisma.post.create({
          data: {
            title,
            content,
            category,
            published,
            authorId: user.userId,
          },
          include: { author: { select: { name: true, email: true } } },
        });

        return successResponse(post, 201);
      } catch (error) {
        console.error("Post CREATE error:", error);
        return errorResponse("게시글 작성 중 오류가 발생했습니다.", 500);
      }
    },
    ["SUPER_ADMIN", "EDITOR"]
  );
}
