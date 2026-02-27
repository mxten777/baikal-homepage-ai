import { successResponse } from "@/lib/api-response";

export async function POST() {
  const response = successResponse({ message: "로그아웃 되었습니다." });
  response.cookies.set("baikal-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
