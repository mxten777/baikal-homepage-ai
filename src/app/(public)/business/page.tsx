import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "사업소개",
  description: "기관의 주요 사업과 프로젝트를 소개합니다.",
};

/* ── 프로젝트 데이터 ── */
const projects = [
  {
    title: "공공데이터 개방 플랫폼",
    description: "국민 누구나 활용할 수 있는 공공데이터 개방 플랫폼을 운영합니다. 다양한 분야의 데이터를 표준화하여 제공하고 있습니다.",
    status: "진행중" as const,
    progress: 72,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: "디지털 전환 지원 사업",
    description: "공공기관의 디지털 전환을 지원하며, AI·클라우드 기반의 차세대 행정시스템 구축을 추진합니다.",
    status: "진행중" as const,
    progress: 45,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "정보보안 강화 프로젝트",
    description: "사이버 보안 위협에 대응하기 위한 정보보안 체계를 강화하고, 안전한 정보 인프라를 구축합니다.",
    status: "계획중" as const,
    progress: 0,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "국민 소통 플랫폼",
    description: "국민과 기관 간의 원활한 소통을 위한 다양한 채널을 운영하며, 열린 행정을 실현합니다.",
    status: "완료" as const,
    progress: 100,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "스마트 행정 서비스",
    description: "모바일 기반의 스마트 행정 서비스를 통해 언제 어디서나 편리한 민원 처리를 지원합니다.",
    status: "진행중" as const,
    progress: 30,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "빅데이터 분석 체계 구축",
    description: "공공 빅데이터를 분석하여 정책 수립에 필요한 인사이트를 도출하고, 국민 맞춤형 서비스를 개발합니다.",
    status: "계획중" as const,
    progress: 0,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

type Status = "진행중" | "완료" | "계획중";
const statusBadge: Record<Status, string> = {
  "진행중": "badge-primary",
  "완료": "badge-success",
  "계획중": "badge-warning",
};
const statusIcon: Record<Status, string> = {
  "진행중": "from-primary-500 to-primary-700",
  "완료": "from-emerald-500 to-emerald-700",
  "계획중": "from-amber-400 to-amber-600",
};
const progressColor: Record<Status, string> = {
  "진행중": "bg-gradient-to-r from-primary-500 to-primary-400",
  "완료": "bg-gradient-to-r from-emerald-500 to-emerald-400",
  "계획중": "bg-gray-200",
};

/* ── 통계 계산 ── */
const totalProjects = projects.length;
const inProgress = projects.filter((p) => p.status === "진행중").length;
const completed = projects.filter((p) => p.status === "완료").length;
const planned = projects.filter((p) => p.status === "계획중").length;

const stats = [
  {
    label: "전체 사업",
    value: totalProjects,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    color: "text-primary-600 bg-primary-50",
  },
  {
    label: "진행중",
    value: inProgress,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "완료",
    value: completed,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "계획중",
    value: planned,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-amber-600 bg-amber-50",
  },
];

export default function BusinessPage() {
  return (
    <div>
      {/* ── 페이지 히어로 ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Breadcrumb items={[{ label: "사업소개" }]} />
          <h1 className="text-display-lg sm:text-display-xl text-white mt-4 animate-fade-up">
            사업소개
          </h1>
          <p className="text-body-lg text-primary-100 mt-3 max-w-xl animate-fade-up delay-100">
            기관이 추진하는 주요 사업과 프로젝트 현황을 안내합니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 요약 통계 ── */}
        <section className="py-12 sm:py-16 animate-fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="interactive-card flex items-center gap-4 py-5 px-5 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-display sm:text-display-lg font-bold text-gray-900 leading-none">{s.value}</p>
                  <p className="text-caption text-gray-600 mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 프로젝트 카드 그리드 ── */}
        <section className="pb-20 sm:pb-24">
          <h2 className="section-title">주요 사업</h2>
          <p className="section-subtitle mb-10">각 사업의 상세 내용과 진행 현황을 확인하세요.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <article
                key={idx}
                className="interactive-card group flex flex-col animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* 카드 헤더 */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statusIcon[project.status]} text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                  </div>
                  <span className={statusBadge[project.status]}>{project.status}</span>
                </div>

                {/* 카드 본문 */}
                <h3 className="text-heading text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{project.description}</p>

                {/* 진행률 바 */}
                {project.status !== "계획중" && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-caption text-gray-600">진행률</span>
                      <span className="text-caption font-semibold text-gray-700">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${progressColor[project.status]} transition-all duration-700`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {project.status === "계획중" && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <p className="text-caption text-gray-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      사업 준비 중
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
