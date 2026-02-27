import Link from "next/link";

const FOOTER_NAV = [
  { label: "기관소개", href: "/about" },
  { label: "사업소개", href: "/business" },
  { label: "공지사항", href: "/board/notice" },
  { label: "자료실", href: "/board/archive" },
  { label: "오시는길", href: "/contact" },
];

const FOOTER_POLICY = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "사이트맵", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="relative bg-primary-950 text-gray-400 overflow-hidden" role="contentinfo">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" style={{ backgroundSize: "24px 24px" }} aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        {/* 상단 CTA 바 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-b border-white/10">
          <div>
            <h2 className="text-white text-lg font-bold">궁금한 점이 있으신가요?</h2>
            <p className="text-sm text-gray-400 mt-1">전화 또는 이메일로 문의해 주세요.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:02-1234-5678"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              02-1234-5678
            </a>
            <a
              href="mailto:info@baikal.co.kr"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              이메일 문의
            </a>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12">
          {/* 기관 정보 */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-bold text-lg">BAIKAL</span>
            </div>
            <address className="not-italic text-sm leading-relaxed space-y-1.5">
              <p>서울특별시 OO구 OO로 123</p>
              <p>전화: <a href="tel:02-1234-5678" className="text-gray-300 hover:text-white transition-colors">02-1234-5678</a></p>
              <p>팩스: 02-1234-5679</p>
              <p>이메일: <a href="mailto:info@baikal.co.kr" className="text-gray-300 hover:text-white transition-colors">info@baikal.co.kr</a></p>
            </address>
          </div>

          {/* 바로가기 */}
          <div>
            <h2 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">바로가기</h2>
            <nav aria-label="푸터 바로가기">
              <ul className="space-y-2.5 text-sm">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 정책 */}
          <div>
            <h2 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">정책 및 약관</h2>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_POLICY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 운영 시간 */}
          <div>
            <h2 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">운영시간</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>평일 09:00 ~ 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>토·일·공휴일 휴무</span>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                점심시간 12:00 ~ 13:00
              </p>
            </div>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>&copy; {new Date().getFullYear()} BAIKAL Public CMS. All rights reserved.</p>
          <p className="text-gray-500">Powered by <span className="text-primary-400 font-medium">BAIKAL AI</span></p>
        </div>
      </div>
    </footer>
  );
}
