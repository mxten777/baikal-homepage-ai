import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "자료실 | 바이칼 공공 CMS",
  description: "바이칼 공공 CMS 자료실입니다. 각종 규정, 매뉴얼, 서식 등을 제공합니다.",
};

/* ── 인라인 SVG 아이콘 ── */
function IconFile() {
  return (
    <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconEmpty() {
  return (
    <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

/* ── 날짜 포맷 유틸 ── */
function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, "-").replace(".", "");
}

/* ── 카테고리 필터 탭 (장식용) ── */
const filterTabs = ["전체", "규정", "매뉴얼", "서식"] as const;

/* ── 페이지 컴포넌트 ── */
export default async function ArchiveBoardPage() {
  const posts = await prisma.post.findMany({
    where: { category: "ARCHIVE", published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } }, attachments: { take: 1 } },
  });

  return (
    <div>
      {/* ── 페이지 히어로 ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Breadcrumb items={[{ label: "게시판", href: "/board/notice" }, { label: "자료실" }]} />
          <h1 className="text-display-lg sm:text-display-xl text-white mt-4 animate-fade-up">
            자료실
          </h1>
          <p className="text-body-lg text-primary-100 mt-3 max-w-xl animate-fade-up delay-100">
            각종 규정, 매뉴얼, 서식 등 유용한 자료를 제공합니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ── 필터 탭 & 카운트 ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-up">
          <div className="flex items-center gap-2 flex-wrap">
            {filterTabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  idx === 0
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-surface-50 text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200"
                }`}
                aria-label={`${tab} 필터`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            총 <span className="font-semibold text-primary-700">{posts.length}</span>건의 자료
          </p>
        </div>

        {posts.length === 0 ? (
          /* ── 빈 상태 ── */
          <div className="glass-card py-20 text-center animate-fade-up">
            <IconEmpty />
            <p className="mt-4 text-body-lg text-gray-500 font-medium">
              등록된 자료가 없습니다.
            </p>
          </div>
        ) : (
          /* ── 카드 그리드 ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {posts.map((post, idx) => (
              <Link
                key={post.id}
                href={`/board/notice/${post.id}`}
                className="interactive-card group flex flex-col animate-fade-up"
                style={{ animationDelay: `${Math.min(idx * 60, 400)}ms` }}
              >
                {/* 카드 상단: 아이콘 + 다운로드 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <IconFile />
                  </div>
                  <span
                    className="w-9 h-9 rounded-lg bg-surface-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all"
                    aria-label="다운로드"
                  >
                    <IconDownload />
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="text-body font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-3 flex-1">
                  {post.title}
                </h3>

                {/* 첨부 표시 */}
                {post.attachments.length > 0 && (
                  <div className="mb-3">
                    <span className="badge-accent !text-[11px]">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                      첨부파일
                    </span>
                  </div>
                )}

                {/* 구분선 */}
                <div className="divider-gradient my-1" />

                {/* 메타 */}
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <IconCalendar />
                    <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <IconEye />
                    {post.viewCount.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
