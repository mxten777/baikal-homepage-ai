import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return errorResponse("이메일과 비밀번호를 입력해주세요.");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse("이메일 또는 비밀번호가 올바르지 않습니다.", 401);
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return errorResponse("이메일 또는 비밀번호가 올바르지 않습니다.", 401);
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // IP 기록
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    await createAuditLog({
      userId: user.id,
      action: "LOGIN",
      target: "auth",
      detail: `로그인 성공: ${email}`,
      ipAddress: ip,
    });

    const response = successResponse({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set("baikal-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("로그인 처리 중 오류가 발생했습니다.", 500);
  }
}
