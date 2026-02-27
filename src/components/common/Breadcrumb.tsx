import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** true일 때 어두운 배경(page-hero) 위에서 사용 */
  variant?: "light" | "dark";
}

export default function Breadcrumb({ items, variant = "dark" }: BreadcrumbProps) {
  const isDark = variant === "dark";
  const baseColor = isDark ? "text-white/70" : "text-gray-500";
  const hoverColor = isDark ? "hover:text-white" : "hover:text-primary-600";
  const currentColor = isDark ? "text-white font-semibold" : "text-gray-900 font-medium";
  const dividerColor = isDark ? "text-white/40" : "text-gray-400";

  return (
    <nav aria-label="브레드크럼" className="mb-6">
      <ol className={`flex items-center space-x-2 text-sm ${baseColor}`}>
        <li>
          <Link href="/" className={`${hoverColor} transition-colors`} aria-label="홈으로 이동">
            홈
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className={dividerColor} aria-hidden="true">/</span>
            {item.href ? (
              <Link href={item.href} className={`${hoverColor} transition-colors`}>
                {item.label}
              </Link>
            ) : (
              <span className={currentColor} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
