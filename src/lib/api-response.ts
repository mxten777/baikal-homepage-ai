import { NextResponse } from "next/server";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function unauthorizedResponse() {
  return errorResponse("인증이 필요합니다.", 401);
}

export function forbiddenResponse() {
  return errorResponse("권한이 없습니다.", 403);
}

export function notFoundResponse(resource = "리소스") {
  return errorResponse(`${resource}을(를) 찾을 수 없습니다.`, 404);
}
