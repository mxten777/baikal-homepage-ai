import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "감사 로그 | BAIKAL CMS",
};

export default async function AdminAuditLogsPage() {
  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  const actionConfig: Record<string, { badge: string; icon: React.ReactNode; color: string }> = {
    LOGIN: {
      badge: "badge-primary",
      color: "bg-blue-50 text-blue-600",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
      ),
    },
    CREATE: {
      badge: "badge-success",
      color: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
      ),
    },
    UPDATE: {
      badge: "badge-accent",
      color: "bg-blue-50 text-blue-600",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
      ),
    },
    DELETE: {
      badge: "badge-warning",
      color: "bg-red-50 text-red-600",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
      ),
    },
  };

  const getConfig = (action: string) => actionConfig[action] ?? { badge: "badge-primary", color: "bg-gray-50 text-gray-600", icon: null };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text tracking-tight">감사 로그</h1>
          <p className="mt-1 text-sm text-gray-500">최근 {logs.length}건의 활동 기록</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["전체", "LOGIN", "CREATE", "UPDATE", "DELETE"].map((f, i) => (
            <span key={f} className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-default ${i === 0 ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-primary-200"}`}>
              {f === "전체" ? "전체" : f}
            </span>
          ))}
        </div>
      </div>

      <div className="divider-gradient" />

      {/* ── Desktop Table ── */}
      <div className="hidden md:block interactive-card !p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 border-b border-gray-100">
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">작업</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">상세</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">사용자</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">대상</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">IP</th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">일시</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400 text-sm">감사 로그가 없습니다.</td></tr>
            ) : (
              logs.map((log, i) => {
                const cfg = getConfig(log.action);
                return (
                  <tr key={log.id} className={`group hover:bg-primary-50/30 transition-colors ${i < logs.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <td className="px-5 py-3.5 text-center">
                      <span className={cfg.badge}>{log.action}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${cfg.color}`}>{cfg.icon}</div>
                        <span className="text-sm text-gray-800 truncate max-w-[300px]">{log.detail ?? log.action}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{log.user?.name ?? "시스템"}</p>
                        <p className="text-xs text-gray-400">{log.user?.email ?? ""}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{log.target}</td>
                    <td className="px-5 py-3.5 text-center text-xs text-gray-400 font-mono">{log.ipAddress ?? "-"}</td>
                    <td className="px-5 py-3.5 text-center text-sm text-gray-500">{formatDate(log.createdAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card List ── */}
      <div className="md:hidden space-y-3">
        {logs.length === 0 ? (
          <div className="interactive-card text-center py-12 text-gray-400 text-sm">감사 로그가 없습니다.</div>
        ) : (
          logs.map((log) => {
            const cfg = getConfig(log.action);
            return (
              <div key={log.id} className="interactive-card !p-4">
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${cfg.color}`}>{cfg.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cfg.badge}>{log.action}</span>
                      <span className="text-xs text-gray-400">{log.target}</span>
                    </div>
                    <p className="text-sm text-gray-800 line-clamp-2">{log.detail ?? log.action}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{log.user?.name ?? "시스템"}</span>
                      <span>·</span>
                      <span>{formatDate(log.createdAt)}</span>
                      {log.ipAddress && <><span>·</span><span className="font-mono">{log.ipAddress}</span></>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
