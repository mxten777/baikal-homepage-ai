import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "BAIKAL Public CMS - 공공기관 홈페이지",
  description:
    "BAIKAL Public CMS는 공공기관을 위한 통합 홈페이지 관리 시스템입니다.",
};

/* ═══════════════════════════════════════════
   히어로 배너 — Full-bleed, 모바일 반응형
   ═══════════════════════════════════════════ */
function HeroBanner() {
  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden" aria-label="메인 배너">
      {/* 도트 패턴 */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20" style={{ backgroundSize: "20px 20px" }} aria-hidden="true" />
      {/* 글로우 */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-primary-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            공공기관 홈페이지 통합 관리 시스템
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-display-xl font-extrabold leading-tight mb-6 tracking-tight">
            더 나은 공공서비스,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-200 via-white to-accent-300">
              BAIKAL CMS
            </span>
            와 함께
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-primary-100/90 mb-10 leading-relaxed max-w-2xl">
            투명하고 효율적인 행정을 위한 차세대 홈페이지 관리 플랫폼.
            접근성·보안·확장성을 모두 갖춘 공공기관 전용 CMS입니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/about"
              className="btn-primary text-base px-8 py-4 rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
            >
              기관소개
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/board/notice"
              className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 text-base px-8 py-4 rounded-2xl backdrop-blur-sm"
            >
              공지사항 확인
            </Link>
          </div>
        </div>

        {/* 통계 카운터 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-10 border-t border-white/10">
          {[
            { label: "방문자 수", value: "12,847", suffix: "명" },
            { label: "공지사항", value: "156", suffix: "건" },
            { label: "자료실", value: "89", suffix: "건" },
            { label: "페이지", value: "24", suffix: "개" },
          ].map((stat, i) => (
            <div key={stat.label} className={`text-center animate-fade-up opacity-0 delay-${(i + 1) * 100}`}>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}<span className="text-primary-300 text-lg ml-0.5">{stat.suffix}</span>
              </p>
              <p className="text-sm text-primary-200 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   공지사항 + 자료실 2컬럼
   ═══════════════════════════════════════════ */
async function BoardPreview() {
  let notices: { id: string; title: string; createdAt: Date }[] = [];
  let archives: { id: string; title: string; createdAt: Date }[] = [];

  try {
    [notices, archives] = await Promise.all([
      prisma.post.findMany({
        where: { category: "NOTICE", published: true },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, createdAt: true },
      }),
      prisma.post.findMany({
        where: { category: "ARCHIVE", published: true },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, createdAt: true },
      }),
    ]);
  } catch {
    // DB 미연결 시 빈 목록
  }

  const formatDate = (d: Date) =>
    d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, ".").replace(/\.$/, "");

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* 공지사항 */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-50">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                  </svg>
                </div>
                <h2 className="text-heading-lg text-gray-900">공지사항</h2>
              </div>
              <Link href="/board/notice" className="text-caption font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
                전체보기
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
            <ul className="divide-y divide-gray-50">
              {notices.length > 0 ? notices.map((notice) => (
                <li key={notice.id}>
                  <Link href={`/board/notice/${notice.id}`} className="flex items-center justify-between px-6 py-3.5 hover:bg-surface-50 transition-colors group">
                    <span className="text-sm text-gray-700 group-hover:text-primary-700 transition-colors truncate mr-4">{notice.title}</span>
                    <time className="text-xs text-gray-500 whitespace-nowrap tabular-nums">{formatDate(notice.createdAt)}</time>
                  </Link>
                </li>
              )) : (
                <li className="px-6 py-8 text-center text-sm text-gray-400">등록된 공지사항이 없습니다.</li>
              )}
            </ul>
          </div>

          {/* 자료실 */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent-50">
                  <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                </div>
                <h2 className="text-heading-lg text-gray-900">자료실</h2>
              </div>
              <Link href="/board/archive" className="text-caption font-medium text-accent-600 hover:text-accent-700 transition-colors flex items-center gap-1">
                전체보기
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
            <ul className="divide-y divide-gray-50">
              {archives.length > 0 ? archives.map((archive) => (
                <li key={archive.id}>
                  <Link href={`/board/archive`} className="flex items-center justify-between px-6 py-3.5 hover:bg-surface-50 transition-colors group">
                    <span className="text-sm text-gray-700 group-hover:text-accent-700 transition-colors truncate mr-4">{archive.title}</span>
                    <time className="text-xs text-gray-500 whitespace-nowrap tabular-nums">{formatDate(archive.createdAt)}</time>
                  </Link>
                </li>
              )) : (
                <li className="px-6 py-8 text-center text-sm text-gray-400">등록된 자료가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   주요 서비스 — SVG 아이콘, 인터랙티브 카드
   ═══════════════════════════════════════════ */
function Services() {
  const services = [
    {
      title: "기관소개",
      description: "기관의 비전, 미션, 연혁을 확인하고 조직 구성을 안내합니다.",
      href: "/about",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
      ),
      color: "primary",
    },
    {
      title: "사업소개",
      description: "공공데이터 플랫폼, 디지털 전환 등 주요 사업을 소개합니다.",
      href: "/business",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
      color: "accent",
    },
    {
      title: "자료실",
      description: "보고서, 양식, 가이드라인 등 각종 자료를 다운로드할 수 있습니다.",
      href: "/board/archive",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      color: "blue",
    },
    {
      title: "오시는길",
      description: "기관 위치, 대중교통 및 자가용 교통편을 안내합니다.",
      href: "/contact",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      color: "amber",
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; hover: string }> = {
    primary: { bg: "bg-primary-50", icon: "text-primary-600", hover: "group-hover:bg-primary-100" },
    accent: { bg: "bg-accent-50", icon: "text-accent-600", hover: "group-hover:bg-accent-100" },
    blue: { bg: "bg-blue-50", icon: "text-blue-600", hover: "group-hover:bg-blue-100" },
    amber: { bg: "bg-amber-50", icon: "text-amber-600", hover: "group-hover:bg-amber-100" },
  };

  return (
    <section aria-labelledby="services-heading" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Services</p>
          <h2 id="services-heading" className="section-title">
            주요 서비스
          </h2>
          <p className="section-subtitle mx-auto mt-3">
            국민에게 보다 나은 공공서비스를 제공하기 위한 다양한 서비스를 운영합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service) => {
            const c = colorMap[service.color];
            return (
              <Link key={service.title} href={service.href} className="interactive-card group p-0">
                <div className="p-6 sm:p-7">
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.hover} ${c.icon} flex items-center justify-center mb-5 transition-colors`}>
                    {service.icon}
                  </div>
                  <h3 className="text-heading text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="px-6 sm:px-7 py-3.5 bg-surface-50 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-medium text-primary-600">자세히 보기</span>
                  <svg className="w-4 h-4 text-primary-400 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA / 연락처 섹션
   ═══════════════════════════════════════════ */
function ContactCTA() {
  return (
    <section aria-labelledby="contact-heading" className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-10" style={{ backgroundSize: "20px 20px" }} aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 xl:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-300 uppercase tracking-widest mb-3">Contact Us</p>
          <h2 id="contact-heading" className="text-display text-white mb-4">문의안내</h2>
          <p className="text-body-lg text-primary-100/90">언제든지 편하게 문의해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              ),
              label: "전화번호",
              value: "02-1234-5678",
              href: "tel:02-1234-5678",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              label: "운영시간",
              value: "평일 09:00 ~ 18:00",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              ),
              label: "이메일",
              value: "info@baikal.co.kr",
              href: "mailto:info@baikal.co.kr",
            },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-white/10 text-primary-200 mb-4">
                {item.icon}
              </div>
              <p className="text-xs text-primary-300 uppercase tracking-wider mb-2">{item.label}</p>
              {item.href ? (
                <a href={item.href} className="text-lg font-bold text-white hover:text-primary-200 transition-colors">
                  {item.value}
                </a>
              ) : (
                <p className="text-lg font-bold text-white">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   메인 페이지 조합
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <BoardPreview />
      <Services />
      <ContactCTA />
    </>
  );
}
