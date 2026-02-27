import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* 고정 헤더 높이만큼 pt 확보 (lg: 유틸+내비 = ~7rem, sm: 내비만 = 4rem) */}
      <main
        id="main-content"
        className="flex-1 pt-16 lg:pt-[6.75rem]"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
