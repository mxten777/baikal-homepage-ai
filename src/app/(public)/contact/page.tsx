import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "오시는길",
  description: "기관 위치 및 교통편 안내",
};

/* ── 연락처 정보 ── */
const contactInfo = [
  {
    label: "주소",
    value: "서울특별시 OO구 OO로 123, OO빌딩 5층 (우 12345)",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    color: "bg-primary-50 text-primary-600",
  },
  {
    label: "전화",
    value: "02-1234-5678",
    href: "tel:02-1234-5678",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    color: "bg-accent-50 text-accent-600",
  },
  {
    label: "팩스",
    value: "02-1234-5679",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "이메일",
    value: "info@baikal.co.kr",
    href: "mailto:info@baikal.co.kr",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600",
  },
];

/* ── 교통편 정보 ── */
const transportInfo = [
  {
    title: "지하철",
    description: "OO역 3번 출구에서 도보 5분",
    details: "OO호선 · OO호선 환승역",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h17.25M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h13.5c.621 0 1.125.504 1.125 1.125v10.875M3.375 14.25h17.25" />
      </svg>
    ),
    color: "from-primary-500 to-primary-700",
  },
  {
    title: "버스",
    description: "OO정류장 하차",
    details: "간선: 101, 202 / 지선: 3301",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h17.25M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h15.75c.621 0 1.125.504 1.125 1.125v10.875M3.375 14.25h17.25" />
      </svg>
    ),
    color: "from-accent-500 to-accent-700",
  },
  {
    title: "자가용",
    description: "건물 지하 주차장 이용 가능",
    details: "방문 시 2시간 무료 주차",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h17.25M21 12V4.5A1.5 1.5 0 0019.5 3h-15A1.5 1.5 0 003 4.5V12m18 0h-2.25m-13.5 0H3" />
      </svg>
    ),
    color: "from-amber-500 to-amber-600",
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* ── 페이지 히어로 ── */}
      <section className="page-hero">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <Breadcrumb items={[{ label: "오시는길" }]} />
          <h1 className="text-display-lg sm:text-display-xl text-white mt-4 animate-fade-up">
            오시는길
          </h1>
          <p className="text-body-lg text-primary-100 mt-3 max-w-xl animate-fade-up delay-100">
            기관 위치와 교통편 정보를 안내합니다.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── 지도 + 연락처 ── */}
        <section className="py-16 sm:py-20 animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* 지도 플레이스홀더 */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-surface-100 to-surface-200 border border-surface-200 aspect-square lg:aspect-video flex items-center justify-center shadow-card group">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-glass flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                  </div>
                  <p className="text-body-lg font-medium text-gray-600">지도 영역</p>
                  <p className="text-sm text-gray-500 mt-1">카카오맵 / 네이버맵 삽입 위치</p>
                </div>
                {/* 장식 그리드 점 */}
                <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" aria-hidden="true" style={{ backgroundSize: "20px 20px" }} />
              </div>
            </div>

            {/* 연락처 카드 그리드 */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info, i) => (
                <div key={info.label} className="interactive-card flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${info.color}`}>
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-body text-primary-600 hover:text-primary-800 transition-colors font-medium break-all">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-body text-gray-700 break-all">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── 교통편 안내 ── */}
        <section className="py-16 sm:py-20 animate-fade-up">
          <h2 className="section-title">교통편 안내</h2>
          <p className="section-subtitle mb-10">다양한 교통수단별 오시는 방법을 안내합니다.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {transportInfo.map((t, i) => (
              <div key={t.title} className="interactive-card group text-center py-8 sm:py-10 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {t.icon}
                </div>
                <h3 className="text-heading text-gray-900 mb-2">{t.title}</h3>
                <p className="text-body text-gray-800 mb-1">{t.description}</p>
                <p className="text-sm text-gray-500">{t.details}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider-gradient" />

        {/* ── 운영시간 안내 ── */}
        <section className="py-16 sm:py-20 animate-fade-up">
          <h2 className="section-title">운영시간</h2>
          <p className="section-subtitle mb-10">방문 전 운영시간을 확인해 주세요.</p>

          <div className="glass-card max-w-2xl mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 sm:px-8 py-5">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-heading text-white">운영시간 안내</h3>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="badge-primary">평일</span>
                  <span className="text-body text-gray-700">월요일 ~ 금요일</span>
                </div>
                <span className="text-body font-semibold text-gray-900">09:00 ~ 18:00</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="badge-warning">점심</span>
                  <span className="text-body text-gray-700">점심시간</span>
                </div>
                <span className="text-body font-semibold text-gray-900">12:00 ~ 13:00</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="badge-accent">휴무</span>
                  <span className="text-body text-gray-700">토·일·공휴일</span>
                </div>
                <span className="text-body font-semibold text-gray-500">휴무</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
