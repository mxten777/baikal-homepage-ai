import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

/* ── 메타데이터 ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id }, select: { title: true } });
  if (!post) return { title: "게시글을 찾을 수 없습니다" };
  return {
    title: `${post.title} | 공지사항 | 바이칼 공공 CMS`,
    description: post.title,
  };
}

/* ── 인라인 SVG 아이콘 ── */
function IconEye() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function IconChevronUp() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/* ── 날짜 포맷 ── */
function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, "-").replace(".", "");
}

/* ── 페이지 컴포넌트 ── */
export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { name: true } }, attachments: true },
  });

  if (!post || post.category !== "NOTICE") {
    notFound();
  }

  // 조회수 증가 (fire-and-forget)
  prisma.post.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  // 이전/다음 게시글
  const [prevPost, nextPost] = await Promise.all([
    prisma.post.findFirst({
      where: { category: "NOTICE", published: true, createdAt: { lt: post.createdAt } },
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true },
    }),
    prisma.post.findFirst({
      where: { category: "NOTICE", published: true, createdAt: { gt: post.createdAt } },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true },
    }),
  ]);

  return (
    <div>
      {/* ── 히어로 (작은 형태) ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Breadcrumb
            items={[
              { label: "게시판", href: "/board/notice" },
              { label: "공지사항", href: "/board/notice" },
              { label: "상세보기" },
            ]}
          />
          <h1 className="text-heading-lg sm:text-display text-white mt-4 animate-fade-up">
            공지사항
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ── 게시글 카드 ── */}
        <article className="glass-card p-6 sm:p-10 animate-fade-up">
          {/* 제목 */}
          <h2 className="text-heading-lg sm:text-display text-gray-900 leading-snug">
            {post.title}
          </h2>

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <IconUser />
              {post.author?.name || "관리자"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar />
              <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconEye />
              조회 {(post.viewCount + 1).toLocaleString()}
            </span>
          </div>

          {/* 구분선 */}
          <div className="divider-gradient my-6 sm:my-8" />

          {/* 첨부파일 */}
          {post.attachments.length > 0 && (
            <div className="bg-surface-50 border border-surface-200 rounded-xl p-4 sm:p-5 mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
                첨부파일 ({post.attachments.length})
              </h3>
              <ul className="space-y-2">
                {post.attachments.map((file) => (
                  <li key={file.id}>
                    <a
                      href={file.fileUrl}
                      className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                      aria-label={`${file.fileName} 다운로드`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {file.fileName}
                      {file.fileSize && (
                        <span className="text-gray-500 text-xs">
                          ({(file.fileSize / 1024).toFixed(0)} KB)
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 본문 */}
          <div
            className="prose max-w-none min-h-[200px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* ── 이전/다음 글 네비게이션 ── */}
        <div className="mt-8 glass-card overflow-hidden divide-y divide-gray-100 animate-fade-up delay-100">
          {nextPost && (
            <Link
              href={`/board/notice/${nextPost.id}`}
              className="flex items-center gap-4 px-5 sm:px-8 py-4 hover:bg-primary-50/50 transition-colors group"
            >
              <span className="flex items-center gap-1.5 text-sm text-gray-500 shrink-0">
                <IconChevronUp />
                다음 글
              </span>
              <span className="text-body text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                {nextPost.title}
              </span>
            </Link>
          )}
          {prevPost && (
            <Link
              href={`/board/notice/${prevPost.id}`}
              className="flex items-center gap-4 px-5 sm:px-8 py-4 hover:bg-primary-50/50 transition-colors group"
            >
              <span className="flex items-center gap-1.5 text-sm text-gray-500 shrink-0">
                <IconChevronDown />
                이전 글
              </span>
              <span className="text-body text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                {prevPost.title}
              </span>
            </Link>
          )}
        </div>

        {/* ── 목록 버튼 ── */}
        <div className="mt-8 flex justify-center animate-fade-up delay-200">
          <Link href="/board/notice" className="btn-secondary gap-2">
            <IconArrowLeft />
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
