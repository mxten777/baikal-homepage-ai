import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter, log: ["info"] });

async function main() {
  console.log("🌱 Seeding database...");

  // ── 1. 사용자 생성 ──
  const adminPassword = await bcrypt.hash("admin1234!", 12);
  const editorPassword = await bcrypt.hash("editor1234!", 12);
  const viewerPassword = await bcrypt.hash("viewer1234!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@baikal.co.kr" },
    update: {},
    create: {
      email: "admin@baikal.co.kr",
      password: adminPassword,
      name: "관리자",
      role: "SUPER_ADMIN",
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@baikal.co.kr" },
    update: {},
    create: {
      email: "editor@baikal.co.kr",
      password: editorPassword,
      name: "편집자",
      role: "EDITOR",
    },
  });

  await prisma.user.upsert({
    where: { email: "viewer@baikal.co.kr" },
    update: {},
    create: {
      email: "viewer@baikal.co.kr",
      password: viewerPassword,
      name: "뷰어",
      role: "VIEWER",
    },
  });

  console.log("✅ Users created");

  // ── 2. 메뉴 생성 ──
  const menuData = [
    { title: "기관소개", url: "/about", order: 1 },
    { title: "사업소개", url: "/business", order: 2 },
    { title: "조직도", url: "/organization", order: 3 },
    { title: "공지사항", url: "/board/notice", order: 4 },
    { title: "자료실", url: "/board/archive", order: 5 },
    { title: "오시는길", url: "/contact", order: 6 },
  ];

  for (const menu of menuData) {
    await prisma.menu.upsert({
      where: { id: `menu-${menu.order}` },
      update: {},
      create: {
        id: `menu-${menu.order}`,
        ...menu,
      },
    });
  }

  console.log("✅ Menus created");

  // ── 3. 페이지 생성 ──
  const pages = [
    {
      title: "기관소개",
      slug: "about",
      content: "<h2>인사말</h2><p>우리 기관 홈페이지를 방문해 주셔서 감사합니다.</p>",
      metaTitle: "기관소개 | BAIKAL CMS",
      metaDescription: "기관의 비전, 미션, 연혁을 소개합니다.",
    },
    {
      title: "사업소개",
      slug: "business",
      content: "<h2>주요 사업</h2><p>주요 사업과 프로젝트를 소개합니다.</p>",
      metaTitle: "사업소개 | BAIKAL CMS",
      metaDescription: "기관의 주요 사업을 안내합니다.",
    },
    {
      title: "조직도",
      slug: "organization",
      content: "<h2>조직 구성</h2><p>기관의 조직 구성을 안내합니다.</p>",
      metaTitle: "조직도 | BAIKAL CMS",
      metaDescription: "기관의 조직 구성을 안내합니다.",
    },
    {
      title: "오시는길",
      slug: "contact",
      content: "<h2>오시는길</h2><p>서울특별시 OO구 OO로 123</p>",
      metaTitle: "오시는길 | BAIKAL CMS",
      metaDescription: "기관 위치 및 교통편을 안내합니다.",
    },
    {
      title: "개인정보처리방침",
      slug: "privacy",
      content: "<h2>개인정보처리방침</h2><p>본 기관의 개인정보처리방침을 안내합니다.</p>",
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  console.log("✅ Pages created");

  // ── 4. 공지사항 생성 ──
  const notices = [
    "2026년도 기관 운영계획 공고",
    "홈페이지 리뉴얼 안내",
    "정보공개 청구 안내",
    "개인정보처리방침 변경 안내",
    "2026년 상반기 채용 공고",
    "시스템 점검 안내",
    "국민참여 프로그램 안내",
    "2025년 연간보고서 공개",
    "정보보안 교육 안내",
    "기관 공개 채용 결과 안내",
  ];

  for (let i = 0; i < notices.length; i++) {
    await prisma.post.create({
      data: {
        title: `[공지] ${notices[i]}`,
        content: `<p>${notices[i]}에 대한 상세 내용입니다.</p><p>자세한 내용은 첨부파일을 참고해 주시기 바랍니다.</p>`,
        category: "NOTICE",
        published: true,
        authorId: admin.id,
        viewCount: Math.floor(Math.random() * 500) + 10,
      },
    });
  }

  console.log("✅ Notices created");

  // ── 5. 자료실 생성 ──
  const archives = [
    "2025년 연간보고서",
    "사업계획서 양식",
    "조직도 파일",
    "로고 가이드라인",
    "서식 모음집",
  ];

  for (let i = 0; i < archives.length; i++) {
    await prisma.post.create({
      data: {
        title: archives[i],
        content: `<p>${archives[i]}을(를) 다운로드할 수 있습니다.</p>`,
        category: "ARCHIVE",
        published: true,
        authorId: editor.id,
        viewCount: Math.floor(Math.random() * 200) + 5,
      },
    });
  }

  console.log("✅ Archives created");

  // ── 6. 배너 생성 ──
  await prisma.banner.createMany({
    data: [
      {
        title: "메인 배너 - 기관 소개",
        imageUrl: "/images/banner-1.jpg",
        linkUrl: "/about",
        order: 1,
        active: true,
      },
      {
        title: "사업 안내 배너",
        imageUrl: "/images/banner-2.jpg",
        linkUrl: "/business",
        order: 2,
        active: true,
      },
    ],
  });

  console.log("✅ Banners created");

  // ── 7. 사이트 설정 ──
  const settings = [
    { key: "site_name", value: "BAIKAL Public CMS" },
    { key: "site_description", value: "공공기관 홈페이지 통합 관리 시스템" },
    { key: "contact_phone", value: "02-1234-5678" },
    { key: "contact_email", value: "info@baikal.co.kr" },
    { key: "contact_address", value: "서울특별시 OO구 OO로 123" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("✅ Site settings created");
  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📝 Login credentials:");
  console.log("  Admin:  admin@baikal.co.kr / admin1234!");
  console.log("  Editor: editor@baikal.co.kr / editor1234!");
  console.log("  Viewer: viewer@baikal.co.kr / viewer1234!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
