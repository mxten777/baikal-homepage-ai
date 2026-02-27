"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "BAIKAL Public CMS",
    siteDescription: "공공기관 홈페이지 통합 관리 시스템",
    contactPhone: "02-1234-5678",
    contactFax: "02-1234-5679",
    contactEmail: "info@baikal.co.kr",
    contactAddress: "서울특별시 OO구 OO로 123",
    footerText: "© 2026 BAIKAL Public CMS. All rights reserved.",
    metaTitle: "BAIKAL Public CMS - 공공기관 홈페이지",
    metaDescription: "공공기관 홈페이지 통합 관리 시스템",
    ogImage: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const update = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
    setSaved(false);
  };

  const sections = [
    {
      title: "기본 정보",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
      ),
      color: "from-primary-500 to-primary-600",
      fields: [
        { id: "siteName", label: "사이트 이름", type: "text" as const },
        { id: "siteDescription", label: "사이트 설명", type: "textarea" as const },
      ],
    },
    {
      title: "연락처",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
      ),
      color: "from-accent-500 to-accent-600",
      fields: [
        { id: "contactPhone", label: "전화번호", type: "text" as const },
        { id: "contactFax", label: "팩스번호", type: "text" as const },
        { id: "contactEmail", label: "이메일", type: "text" as const },
        { id: "contactAddress", label: "주소", type: "text" as const },
      ],
    },
    {
      title: "SEO 설정",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
      ),
      color: "from-violet-500 to-purple-600",
      fields: [
        { id: "metaTitle", label: "Meta Title", type: "text" as const },
        { id: "metaDescription", label: "Meta Description", type: "textarea" as const },
        { id: "ogImage", label: "OG Image URL", type: "text" as const },
      ],
    },
    {
      title: "푸터",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
      ),
      color: "from-amber-500 to-orange-500",
      fields: [
        { id: "footerText", label: "푸터 텍스트", type: "text" as const },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text tracking-tight">사이트 설정</h1>
          <p className="mt-1 text-sm text-gray-500">홈페이지의 기본 설정을 관리합니다.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm !px-5 !py-2.5 w-fit disabled:opacity-50">
          {saving ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              저장 중…
            </span>
          ) : saved ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              저장 완료!
            </span>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              설정 저장
            </>
          )}
        </button>
      </div>

      <div className="divider-gradient" />

      {/* ── Settings Sections ── */}
      <div className="max-w-3xl space-y-6">
        {sections.map((section, si) => (
          <div key={section.title} className={`interactive-card !p-0 overflow-hidden animate-fade-up delay-${Math.min((si + 1) * 100, 400)}`}>
            {/* Section Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.color} text-white flex items-center justify-center`}>
                {section.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
            </div>

            {/* Fields */}
            <div className="p-6 space-y-5">
              {section.fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      value={(settings as Record<string, string>)[field.id]}
                      onChange={(e) => update(field.id, e.target.value)}
                      rows={3}
                      className="input-field resize-y"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type="text"
                      value={(settings as Record<string, string>)[field.id]}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="input-field"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
