import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "기관소개",
  description: "기관의 비전, 미션, 핵심가치, 연혁을 소개합니다.",
};

/* ── SVG 아이콘 컴포넌트 ── */
function IconVision() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconMission() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconIntegrity() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconInnovation() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

function IconCollaboration() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

function IconService() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg className="w-16 h-16 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const coreValues = [
  { icon: <IconIntegrity />, title: "청렴", desc: "투명하고 공정한 업무 수행으로 국민의 신뢰를 확보합니다.", color: "from-primary-500 to-primary-700" },
  { icon: <IconInnovation />, title: "혁신", desc: "끊임없는 변화와 도전으로 미래 가치를 창출합니다.", color: "from-accent-500 to-accent-700" },
  { icon: <IconCollaboration />, title: "협력", desc: "소통과 협업을 통해 시너지를 극대화합니다.", color: "from-primary-400 to-accent-500" },
  { icon: <IconService />, title: "봉사", desc: "국민을 위한 헌신적인 서비스를 실천합니다.", color: "from-accent-400 to-primary-500" },
];

const historyData = [
  { year: "2026", events: ["홈페이지 리뉴얼", "BAIKAL CMS 도입"] },
  { year: "2025", events: ["기관 설립 10주년", "중장기 발전계획 수립"] },
  { year: "2020", events: ["조직 개편", "대국민 서비스 확대"] },
  { year: "2015", events: ["기관 설립"] },
];

export default function AboutPage() {
  return (
    <div>
      {/* ── 페이지 히어로 ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Breadcrumb items={[{ label: "기관소개" }]} />
          <h1 className="text-display-lg sm:text-display-xl text-white mt-4 animate-fade-up">
            기관소개
          </h1>
          <p className="text-body-lg text-primary-100 mt-3 max-w-xl animate-fade-up delay-100">
            비전과 미션, 핵심가치, 그리고 역사를 소개합니다.
          </p>
        </div>
      </section>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 인사말 ── */}
        <section aria-labelledby="greeting-heading" className="py-16 sm:py-20 animate-fade-up">
          <h2 id="greeting-heading" className="section-title">인사말</h2>
          <div className="divider-gradient mb-10" />

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* 아바타 */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 border border-primary-200 flex items-center justify-center shadow-card">
                <IconUser />
              </div>
            </div>

            {/* 인사말 본문 */}
            <div className="border-l-4 border-transparent bg-gradient-to-b from-primary-500 to-accent-500 rounded-l-sm p-[3px] pl-0 flex-1">
              <div className="bg-white rounded-r-2xl pl-6 sm:pl-8 pr-6 sm:pr-8 py-6 sm:py-8 border-l-0">
                <p className="text-heading-lg text-gray-900 mb-4">
                  안녕하십니까.
                </p>
                <p className="text-body text-gray-700 mb-4 leading-relaxed">
                  우리 기관 홈페이지를 방문해 주신 여러분을 진심으로 환영합니다.
                  저희는 국민에게 신뢰받는 공공기관으로서 투명하고 효율적인
                  행정 서비스를 제공하기 위해 최선을 다하고 있습니다.
                </p>
                <p className="text-body text-gray-700 mb-6 leading-relaxed">
                  앞으로도 국민 여러분의 목소리에 귀 기울이며, 더 나은 서비스를
                  제공할 수 있도록 노력하겠습니다.
                </p>
                <p className="text-right text-body-lg font-semibold text-primary-800 mt-8">
                  기관장 <span className="gradient-text">홍길동</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 비전 & 미션 ── */}
        <section aria-labelledby="vision-heading" className="pb-16 sm:pb-20 animate-fade-up">
          <h2 id="vision-heading" className="section-title">비전 및 미션</h2>
          <p className="section-subtitle mb-10">우리 기관이 추구하는 방향과 목표를 안내합니다.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* 비전 카드 */}
            <div className="interactive-card group text-center py-10 sm:py-12 px-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <IconVision />
              </div>
              <span className="badge-primary mb-4 inline-block">VISION</span>
              <h3 className="text-heading-lg text-gray-900 mt-3 mb-3">비전</h3>
              <p className="text-body-lg text-gray-700">
                국민과 함께하는 신뢰받는 공공기관
              </p>
            </div>

            {/* 미션 카드 */}
            <div className="interactive-card group text-center py-10 sm:py-12 px-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <IconMission />
              </div>
              <span className="badge-accent mb-4 inline-block">MISSION</span>
              <h3 className="text-heading-lg text-gray-900 mt-3 mb-3">미션</h3>
              <p className="text-body-lg text-gray-700">
                투명하고 효율적인 공공 서비스 실현
              </p>
            </div>
          </div>
        </section>

        {/* ── 핵심가치 ── */}
        <section aria-labelledby="values-heading" className="pb-16 sm:pb-20 animate-fade-up">
          <h2 id="values-heading" className="section-title">핵심가치</h2>
          <p className="section-subtitle mb-10">우리의 업무 철학을 이끄는 네 가지 핵심가치입니다.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                className="interactive-card group text-center py-8 px-5 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {v.icon}
                </div>
                <h3 className="text-heading text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 연혁 ── */}
        <section aria-labelledby="history-heading" className="pb-20 sm:pb-24 animate-fade-up">
          <h2 id="history-heading" className="section-title">연혁</h2>
          <p className="section-subtitle mb-12">기관의 주요 발자국을 돌아봅니다.</p>

          <div className="relative">
            {/* 타임라인 세로선 */}
            <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-300 to-accent-400" aria-hidden="true" />

            <div className="space-y-10 sm:space-y-12">
              {historyData.map((item, idx) => (
                <div key={item.year} className="relative pl-14 sm:pl-20 animate-fade-up" style={{ animationDelay: `${idx * 120}ms` }}>
                  {/* 타임라인 점 */}
                  <div className="absolute left-3 sm:left-6 top-1 w-4 h-4 rounded-full bg-white border-[3px] border-primary-500 shadow-md z-10" aria-hidden="true" />

                  {/* 연도 */}
                  <span className="inline-block text-heading-lg gradient-text mb-3">
                    {item.year}
                  </span>

                  {/* 이벤트 목록 */}
                  <div className="glass-card p-5 sm:p-6">
                    <ul className="space-y-2">
                      {item.events.map((event, i) => (
                        <li key={i} className="flex items-start gap-3 text-body text-gray-800">
                          <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                          </svg>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
