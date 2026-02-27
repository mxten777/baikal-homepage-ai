"use client";

import { useState } from "react";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  active: boolean;
  order: number;
}

const initialBanners: Banner[] = [
  { id: "1", title: "메인 배너 1", imageUrl: "/banners/1.jpg", linkUrl: "/about", active: true, order: 1 },
  { id: "2", title: "메인 배너 2", imageUrl: "/banners/2.jpg", linkUrl: "/business", active: true, order: 2 },
  { id: "3", title: "이벤트 배너", imageUrl: "/banners/3.jpg", linkUrl: "/board/notice", active: false, order: 3 },
];

const gradients = [
  "from-primary-600 via-primary-500 to-accent-500",
  "from-accent-600 via-accent-500 to-primary-500",
  "from-violet-600 via-purple-500 to-pink-500",
];

export default function AdminBannersPage() {
  const [banners, setBanners] = useState(initialBanners);

  const toggleActive = (id: string) => {
    setBanners(banners.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));
  };

  const deleteBanner = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text tracking-tight">배너 관리</h1>
          <p className="mt-1 text-sm text-gray-500">총 {banners.length}개의 배너 · 활성 {banners.filter((b) => b.active).length}개</p>
        </div>
        <button className="btn-primary text-sm !px-5 !py-2.5 w-fit">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          새 배너
        </button>
      </div>

      <div className="divider-gradient" />

      {/* ── Banner Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {banners.map((banner, i) => (
          <div key={banner.id} className={`interactive-card !p-0 overflow-hidden group animate-fade-up delay-${Math.min((i + 1) * 100, 300)}`}>
            {/* Image Placeholder */}
            <div className={`relative h-44 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
              <div className="absolute inset-0 bg-dot-pattern opacity-10" style={{ backgroundSize: "16px 16px" }} />
              <div className="relative text-center text-white/90">
                <svg className="w-10 h-10 mx-auto mb-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M2.25 18V6a2.25 2.25 0 012.25-2.25h15A2.25 2.25 0 0121.75 6v12A2.25 2.25 0 0119.5 20.25H4.5A2.25 2.25 0 012.25 18z" />
                </svg>
                <p className="text-sm font-medium">{banner.title}</p>
              </div>
              {/* Order badge */}
              <span className="absolute top-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-black/20 backdrop-blur-sm text-white text-xs font-bold">
                {banner.order}
              </span>
              {/* Status badge */}
              <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${banner.active ? "bg-emerald-500/20 text-emerald-100" : "bg-gray-900/30 text-gray-300"}`}>
                {banner.active ? "활성" : "비활성"}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{banner.title}</h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
                  <span className="font-mono truncate">{banner.linkUrl || "링크 없음"}</span>
                </div>
              </div>

              <div className="divider-gradient" />

              <div className="flex items-center justify-between">
                <button onClick={() => toggleActive(banner.id)} className={banner.active ? "badge-success cursor-pointer" : "badge-warning cursor-pointer"}>
                  {banner.active ? "활성" : "비활성"}
                </button>
                <div className="flex gap-1.5">
                  <button className="p-2 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all" title="수정">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                  </button>
                  <button onClick={() => deleteBanner(banner.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="삭제">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
