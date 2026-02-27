import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "조직도",
  description: "기관의 조직 구성을 안내합니다.",
};

/* ── 부서 데이터 ── */
const departments = [
  {
    name: "기획조정실",
    head: "김기획",
    description: "기관 경영전략 수립 및 성과관리",
    teams: ["기획팀", "예산팀", "성과관리팀"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    name: "행정지원과",
    head: "이행정",
    description: "인사·총무·재무 행정 전반 지원",
    teams: ["총무팀", "인사팀", "재무팀"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    name: "정보기술과",
    head: "박기술",
    description: "IT 인프라 구축·운영 및 정보보안",
    teams: ["개발팀", "인프라팀", "보안팀"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
  },
  {
    name: "대외협력과",
    head: "최협력",
    description: "대외 홍보·국제협력·민원 서비스",
    teams: ["홍보팀", "국제협력팀", "민원팀"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 9.75c0 .746-.092 1.472-.262 2.165M4.584 7.582C3.5 8.889 3 10.26 3 9.75c0 .746.092 1.472.262 2.165m0 0a17.959 17.959 0 003.478 5.338m0 0A11.953 11.953 0 0112 19.5a11.953 11.953 0 005.26-2.247m0 0a17.959 17.959 0 003.478-5.338" />
      </svg>
    ),
  },
];

export default function OrganizationPage() {
  return (
    <div>
      {/* ── 페이지 히어로 ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Breadcrumb items={[{ label: "조직도" }]} />
          <h1 className="text-display-lg sm:text-display-xl text-white mt-4 animate-fade-up">
            조직도
          </h1>
          <p className="text-body-lg text-primary-100 mt-3 max-w-xl animate-fade-up delay-100">
            기관의 조직 구성과 각 부서의 역할을 안내합니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* ── 기관장 ── */}
        <div className="flex flex-col items-center mb-6 animate-fade-up">
          <div className="interactive-card group text-center px-10 sm:px-14 py-6 sm:py-8 bg-gradient-to-br from-primary-800 to-primary-900 border-primary-700">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-primary-100 mb-2">기관 대표</span>
            <h2 className="text-heading-lg text-white">기관장</h2>
            <p className="text-body text-primary-200 mt-1">홍길동</p>
          </div>
        </div>

        {/* ── 연결선: 기관장 → 부서 (세로) ── */}
        <div className="flex flex-col items-center mb-6 animate-fade-up delay-100" aria-hidden="true">
          <div className="w-0.5 h-10 bg-gradient-to-b from-primary-400 to-primary-300" />
        </div>

        {/* ── 연결선: 가로 (데스크톱만) ── */}
        <div className="hidden lg:block mb-6 animate-fade-up delay-200" aria-hidden="true">
          <div className="max-w-4xl mx-auto h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />
        </div>

        {/* ── 연결선: 세로 내림 (데스크톱만) ── */}
        <div className="hidden lg:grid grid-cols-4 max-w-4xl mx-auto mb-0 animate-fade-up delay-200" aria-hidden="true">
          {departments.map((d) => (
            <div key={d.name} className="flex justify-center">
              <div className="w-0.5 h-6 bg-primary-300" />
            </div>
          ))}
        </div>

        {/* ── 부서 카드 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {departments.map((dept, idx) => (
            <div key={dept.name} className="flex flex-col items-center animate-fade-up" style={{ animationDelay: `${200 + idx * 100}ms` }}>
              {/* 모바일 세로 연결선 */}
              <div className="lg:hidden w-0.5 h-6 bg-primary-300 mb-0" aria-hidden="true" />

              <div className="interactive-card group w-full overflow-hidden">
                {/* 카드 헤더 */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 -m-6 mb-5 px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform duration-300">
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-heading text-white leading-tight">{dept.name}</h3>
                    <p className="text-caption text-primary-100">{dept.head}</p>
                  </div>
                </div>

                {/* 설명 */}
                <p className="text-sm text-gray-600 mb-4">{dept.description}</p>

                {/* 하위 팀 목록 */}
                <ul className="space-y-2">
                  {dept.teams.map((team) => (
                    <li key={team} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" aria-hidden="true" />
                      {team}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── 조직 요약 ── */}
        <section className="mt-16 sm:mt-20 animate-fade-up">
          <div className="divider-gradient mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: "부서", value: "4개", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" },
              { label: "팀", value: "12개", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
              { label: "소속 인원", value: "120명", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
              { label: "설립", value: "2015년", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
            ].map((item, i) => (
              <div key={item.label} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <p className="text-heading-lg text-gray-900">{item.value}</p>
                <p className="text-caption text-gray-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
