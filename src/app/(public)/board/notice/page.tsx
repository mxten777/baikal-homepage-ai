import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "공지사항 | 바이칼 공공 CMS",
  description: "바이칼 공공 CMS 공지사항 게시판입니다.",
};

/* ── 인라인 SVG 아이콘 ── */
function IconSearch() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconEmpty() {
  return (
    <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

/* ── 날짜 포맷 유틸 ── */
function formatDate(date: Date): string {
  return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, "-").replace(".", "");
}

function isNew(date: Date): boolean {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff < 7 * 24 * 60 * 60 * 1000;
}

/* ── 페이지 컴포넌트 ── */
export default async function NoticeBoardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const query = params.q || "";
  const itemsPerPage = 10;

  const where = {
    category: "NOTICE" as const,
    published: true,
    ...(query ? { title: { contains: query, mode: "insensitive" as const } } : {}),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      include: { author: { select: { name: true } } },
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startNum = totalCount - (currentPage - 1) * itemsPerPage;

  return (
    <div>
      {/* ── 페이지 히어로 ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Breadcrumb items={[{ label: "게시판", href: "/board/notice" }, { label: "공지사항" }]} />
          <h1 className="text-display-lg sm:text-display-xl text-white mt-4 animate-fade-up">
            공지사항
          </h1>
          <p className="text-body-lg text-primary-100 mt-3 max-w-xl animate-fade-up delay-100">
            기관의 주요 공지사항을 확인하세요.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* ── 검색 & 카운트 ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-up">
          <p className="text-sm text-gray-600">
            총 <span className="font-semibold text-primary-700">{totalCount}</span>건의 공지사항
          </p>
          <form method="get" action="/board/notice" className="flex items-center gap-2 max-w-sm w-full sm:w-auto">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="공지사항 검색..."
              className="input-field flex-1"
              aria-label="공지사항 검색"
            />
            <button type="submit" className="btn-primary !px-4 !py-3" aria-label="검색">
              <IconSearch />
            </button>
          </form>
        </div>

        {posts.length === 0 ? (
          /* ── 빈 상태 ── */
          <div className="glass-card py-20 text-center animate-fade-up">
            <IconEmpty />
            <p className="mt-4 text-body-lg text-gray-500 font-medium">
              {query ? "검색 결과가 없습니다." : "등록된 공지사항이 없습니다."}
            </p>
            {query && (
              <Link href="/board/notice" className="btn-secondary mt-6 inline-flex">
                전체 목록 보기
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* ── 데스크톱 테이블 ── */}
            <div className="hidden md:block glass-card overflow-hidden animate-fade-up">
              <table className="w-full" role="table" aria-label="공지사항 목록">
                <thead>
                  <tr className="border-b-2 border-primary-100 bg-surface-50">
                    <th scope="col" className="px-5 py-4 text-center text-sm font-semibold text-gray-600 w-20">번호</th>
                    <th scope="col" className="px-5 py-4 text-left text-sm font-semibold text-gray-600">제목</th>
                    <th scope="col" className="px-5 py-4 text-center text-sm font-semibold text-gray-600 w-28">작성자</th>
                    <th scope="col" className="px-5 py-4 text-center text-sm font-semibold text-gray-600 w-32">등록일</th>
                    <th scope="col" className="px-5 py-4 text-center text-sm font-semibold text-gray-600 w-24">조회</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map((post, idx) => (
                    <tr
                      key={post.id}
                      className={`group transition-all duration-200 hover:bg-primary-50/50 ${idx % 2 === 1 ? "bg-surface-50/50" : ""}`}
                    >
                      <td className="px-5 py-4 text-center text-sm text-gray-500 font-medium">
                        {startNum - idx}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/board/notice/${post.id}`}
                          className="text-body text-gray-800 font-medium group-hover:text-primary-600 transition-colors inline-flex items-center gap-2"
                        >
                          <span className="line-clamp-1">{post.title}</span>
                          {isNew(post.createdAt) && (
                            <span className="badge-primary !py-0.5 !px-2 !text-[10px] shrink-0">NEW</span>
                          )}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-gray-600">
                        {post.author?.name || "관리자"}
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-gray-600">
                        <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-gray-500">
                        <IconEye />{post.viewCount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── 모바일 카드 목록 ── */}
            <div className="md:hidden space-y-3 animate-fade-up">
              {posts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/board/notice/${post.id}`}
                  className="interactive-card block !p-4 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm text-gray-500 font-medium">#{startNum - idx}</span>
                        {isNew(post.createdAt) && (
                          <span className="badge-primary !py-0 !px-1.5 !text-[10px]">NEW</span>
                        )}
                      </div>
                      <h3 className="text-body font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span>{post.author?.name || "관리자"}</span>
                        <span>·</span>
                        <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                        <span>·</span>
                        <span className="inline-flex items-center"><IconEye />{post.viewCount}</span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors shrink-0 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── 페이지네이션 ── */}
            {totalPages > 1 && (
              <nav aria-label="페이지 이동" className="flex items-center justify-center gap-1 mt-10 animate-fade-up delay-200">
                {currentPage > 1 ? (
                  <Link
                    href={`/board/notice?page=${currentPage - 1}${query ? `&q=${query}` : ""}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-all"
                    aria-label="이전 페이지"
                  >
                    <IconChevronLeft />
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-300 cursor-not-allowed">
                    <IconChevronLeft />
                  </span>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                  .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] ?? 0) > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "..." ? (
                      <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                        ···
                      </span>
                    ) : (
                      <Link
                        key={item}
                        href={`/board/notice?page=${item}${query ? `&q=${query}` : ""}`}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                          item === currentPage
                            ? "bg-primary-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                        }`}
                        aria-current={item === currentPage ? "page" : undefined}
                      >
                        {item}
                      </Link>
                    )
                  )}

                {currentPage < totalPages ? (
                  <Link
                    href={`/board/notice?page=${currentPage + 1}${query ? `&q=${query}` : ""}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-all"
                    aria-label="다음 페이지"
                  >
                    <IconChevronRight />
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-gray-300 cursor-not-allowed">
                    <IconChevronRight />
                  </span>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
