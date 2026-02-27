"use client";

import { useState } from "react";

interface MenuItem {
  id: string;
  title: string;
  url: string;
  order: number;
  visible: boolean;
}

const initialMenus: MenuItem[] = [
  { id: "1", title: "기관소개", url: "/about", order: 1, visible: true },
  { id: "2", title: "사업소개", url: "/business", order: 2, visible: true },
  { id: "3", title: "조직도", url: "/organization", order: 3, visible: true },
  { id: "4", title: "공지사항", url: "/board/notice", order: 4, visible: true },
  { id: "5", title: "자료실", url: "/board/archive", order: 5, visible: true },
  { id: "6", title: "오시는길", url: "/contact", order: 6, visible: true },
];

export default function AdminMenusPage() {
  const [menus, setMenus] = useState(initialMenus);
  const [newMenu, setNewMenu] = useState({ title: "", url: "" });
  const [saving, setSaving] = useState(false);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...menus];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    updated.forEach((m, i) => (m.order = i + 1));
    setMenus(updated);
  };

  const moveDown = (index: number) => {
    if (index === menus.length - 1) return;
    const updated = [...menus];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    updated.forEach((m, i) => (m.order = i + 1));
    setMenus(updated);
  };

  const toggleVisibility = (id: string) => {
    setMenus(menus.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m)));
  };

  const addMenu = () => {
    if (!newMenu.title || !newMenu.url) return;
    setMenus([...menus, { id: String(Date.now()), title: newMenu.title, url: newMenu.url, order: menus.length + 1, visible: true }]);
    setNewMenu({ title: "", url: "" });
  };

  const deleteMenu = (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updated = menus.filter((m) => m.id !== id);
      updated.forEach((m, i) => (m.order = i + 1));
      setMenus(updated);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text tracking-tight">메뉴 관리</h1>
          <p className="mt-1 text-sm text-gray-500">총 {menus.length}개의 메뉴</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm !px-5 !py-2.5 w-fit disabled:opacity-50">
          {saving ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              저장 중…
            </span>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
              순서 저장
            </>
          )}
        </button>
      </div>

      <div className="divider-gradient" />

      {/* ── Add Menu Card ── */}
      <div className="interactive-card">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
          <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          메뉴 추가
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" value={newMenu.title} onChange={(e) => setNewMenu({ ...newMenu, title: e.target.value })} placeholder="메뉴 이름" className="input-field sm:flex-1" aria-label="메뉴 이름" />
          <input type="text" value={newMenu.url} onChange={(e) => setNewMenu({ ...newMenu, url: e.target.value })} placeholder="URL (예: /about)" className="input-field sm:flex-1 font-mono text-sm" aria-label="메뉴 URL" />
          <button onClick={addMenu} className="btn-primary text-sm !px-6 !py-3 whitespace-nowrap">
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            추가
          </button>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="hidden md:block interactive-card !p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 border-b border-gray-100">
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">순서</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">메뉴명</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">표시</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">이동</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">관리</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu.id} className={`group hover:bg-primary-50/30 transition-colors ${index < menus.length - 1 ? "border-b border-gray-50" : ""}`}>
                <td className="px-5 py-3.5 text-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-surface-100 text-xs font-bold text-gray-500">{menu.order}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-300 cursor-grab" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-primary-700 transition-colors">{menu.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-gray-500 font-mono">{menu.url}</td>
                <td className="px-5 py-3.5 text-center">
                  <button onClick={() => toggleVisibility(menu.id)} className={menu.visible ? "badge-success" : "badge-warning"}>{menu.visible ? "표시" : "숨김"}</button>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <div className="flex justify-center gap-1.5">
                    <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all disabled:opacity-30" aria-label="위로 이동">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === menus.length - 1} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all disabled:opacity-30" aria-label="아래로 이동">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <button onClick={() => deleteMenu(menu.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all" title="삭제">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card List ── */}
      <div className="md:hidden space-y-3">
        {menus.map((menu, index) => (
          <div key={menu.id} className="interactive-card !p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary-50 text-primary-700 text-sm font-bold shrink-0">{menu.order}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{menu.title}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{menu.url}</p>
                </div>
              </div>
              <button onClick={() => toggleVisibility(menu.id)} className={menu.visible ? "badge-success shrink-0" : "badge-warning shrink-0"}>{menu.visible ? "표시" : "숨김"}</button>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="btn-ghost !px-3 !py-1.5 text-xs disabled:opacity-30">↑ 위로</button>
                <button onClick={() => moveDown(index)} disabled={index === menus.length - 1} className="btn-ghost !px-3 !py-1.5 text-xs disabled:opacity-30">↓ 아래로</button>
              </div>
              <button onClick={() => deleteMenu(menu.id)} className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
