import { verifyToken, type JWTPayload } from "./auth";
import { unauthorizedResponse, forbiddenResponse } from "./api-response";
import { NextRequest, NextResponse } from "next/server";

type Role = "SUPER_ADMIN" | "EDITOR" | "VIEWER";

/**
 * API Route 미들웨어: 인증 확인 + 역할 체크
 */
export async function withAuth(
  request: NextRequest,
  handler: (user: JWTPayload, req: NextRequest) => Promise<NextResponse>,
  allowedRoles?: Role[]
): Promise<NextResponse> {
  const token = request.cookies.get("baikal-token")?.value;

  if (!token) {
    return unauthorizedResponse();
  }

  const user = await verifyToken(token);
  if (!user) {
    return unauthorizedResponse();
  }

  if (allowedRoles && !allowedRoles.includes(user.role as Role)) {
    return forbiddenResponse();
  }

  return handler(user, request);
}
