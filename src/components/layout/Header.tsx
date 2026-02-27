"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "기관소개", href: "/about" },
  { label: "사업소개", href: "/business" },
  { label: "조직도", href: "/organization" },
  { label: "공지사항", href: "/board/notice" },
  { label: "자료실", href: "/board/archive" },
  { label: "오시는길", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-glass border-b border-gray-100/50"
          : "bg-white/80 backdrop-blur-md"
      }`}
      role="banner"
    >
      <a href="#main-content" className="sr-only focus:not-sr-only">
        본문 바로가기
      </a>

      {/* 상단 유틸리티 바 */}
      <div className="hidden lg:block border-b border-gray-100/60">
        <div className="max-w-7xl mx-auto px-6 xl:px-8">
          <div className="flex justify-between items-center h-9 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              공공기관 홈페이지 통합 관리 시스템
            </span>
            <div className="flex items-center gap-4">
              <Link href="/sitemap" className="hover:text-primary-600 transition-colors">사이트맵</Link>
              <span className="w-px h-3 bg-gray-200" aria-hidden="true" />
              <Link href="/admin" className="hover:text-primary-600 transition-colors">관리자</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <nav className="flex justify-between items-center h-16 lg:h-[4.5rem]" aria-label="메인 네비게이션">
          {/* 로고 */}
          <Link href="/" className="relative flex items-center gap-2.5 group" aria-label="홈으로 이동">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 shadow-md group-hover:shadow-lg transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-primary-900 leading-none">BAIKAL</span>
              <span className="text-[10px] font-medium text-primary-500 tracking-widest uppercase leading-none mt-0.5">Public CMS</span>
            </div>
          </Link>

          {/* 데스크톱 내비 */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-600 hover:text-primary-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary-500 rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* 데스크톱 CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/board/notice" className="btn-ghost text-xs">
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              검색
            </Link>
          </div>

          {/* 모바일 햄버거 */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
              <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
              <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* 모바일 메뉴 */}
      <div className={`lg:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <nav
          id="mobile-menu"
          className={`absolute top-0 right-0 w-full max-w-sm h-[calc(100dvh-4rem)] bg-white shadow-glass-lg transform transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          aria-label="모바일 네비게이션"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.href} className="animate-slide-in-right opacity-0" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive(item.href) ? "text-primary-700 bg-primary-50" : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                      }`}
                    >
                      {isActive(item.href) && <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-1">
                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-primary-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  관리자
                </Link>
                <Link href="/sitemap" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-primary-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                  사이트맵
                </Link>
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-50 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">BAIKAL Public CMS v1.0</p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
