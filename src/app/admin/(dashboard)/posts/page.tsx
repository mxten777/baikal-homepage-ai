import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "게시물 관리 | BAIKAL CMS",
};

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  const total = posts.length;
  const noticeCount = posts.filter((p) => p.category === "NOTICE").length;
  const archiveCount = posts.filter((p) => p.category === "ARCHIVE").length;

  const categories = [
    { key: "ALL", label: "전체", count: total },
    { key: "NOTICE", label: "공지사항", count: noticeCount },
    { key: "ARCHIVE", label: "자료실", count: archiveCount },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text tracking-tight">게시물 관리</h1>
          <p className="mt-1 text-sm text-gray-500">총 {total}개의 게시물</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary text-sm !px-5 !py-2.5">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          새 게시물
        </Link>
      </div>

      <div className="divider-gradient" />

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat.key}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-default ${
              cat.key === "ALL"
                ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary-200 hover:bg-primary-50"
            }`}
          >
            {cat.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                cat.key === "ALL" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              {cat.count}
            </span>
          </span>
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="게시물 검색..."
            className="input-field !pl-10"
            readOnly
          />
        </div>
        <button className="btn-secondary text-sm !px-5 !py-2.5">검색</button>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block interactive-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" readOnly />
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  카테고리
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">
                  작성자
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  등록일
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  상태
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  조회
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-gray-400 text-sm">
                    등록된 게시물이 없습니다.
                  </td>
                </tr>
              ) : (
                posts.map((post, i) => (
                  <tr
                    key={post.id}
                    className={`group hover:bg-primary-50/30 transition-colors ${
                      i < posts.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" readOnly />
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-primary-700 transition-colors truncate max-w-[300px]">
                        {post.title}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={post.category === "NOTICE" ? "badge-primary" : "badge-accent"}>
                        {post.category === "NOTICE" ? "공지" : "자료"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm text-gray-500">
                      {post.author?.name ?? "관리자"}
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {post.published ? (
                        <span className="badge-success">공개</span>
                      ) : (
                        <span className="badge-warning">비공개</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm text-gray-500">
                      {post.viewCount}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex justify-center gap-1.5">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                          title="수정"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                          </svg>
                        </Link>
                        <button
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                          title="삭제"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile Card List ── */}
      <div className="md:hidden space-y-3">
        {posts.length === 0 ? (
          <div className="interactive-card text-center py-12 text-gray-400 text-sm">
            등록된 게시물이 없습니다.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="interactive-card !p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-gray-800 flex-1 line-clamp-2">{post.title}</h3>
                <div className="flex gap-1 flex-shrink-0">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                  </Link>
                  <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={post.category === "NOTICE" ? "badge-primary" : "badge-accent"}>
                  {post.category === "NOTICE" ? "공지사항" : "자료실"}
                </span>
                {post.published ? (
                  <span className="badge-success">공개</span>
                ) : (
                  <span className="badge-warning">비공개</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{post.author?.name ?? "관리자"}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {post.viewCount}
                  </span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Pagination (decorative) ── */}
      {posts.length > 0 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          <button className="p-2 rounded-lg text-gray-400 hover:bg-surface-100 transition-colors" disabled>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold shadow-md">
            1
          </button>
          <button className="w-9 h-9 rounded-lg text-gray-500 text-sm font-medium hover:bg-surface-100 transition-colors">
            2
          </button>
          <button className="w-9 h-9 rounded-lg text-gray-500 text-sm font-medium hover:bg-surface-100 transition-colors">
            3
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:bg-surface-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
