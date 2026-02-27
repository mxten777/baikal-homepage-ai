# BAIKAL Public CMS — 프로젝트 진행 현황 및 향후 계획

> **최종 업데이트**: 2026년 2월 27일  
> **리포지토리**: https://github.com/mxten777/baikal-homepage-ai  
> **기술 스택**: Next.js 14 · TypeScript · TailwindCSS · Prisma 7 · PostgreSQL

---

## 1. 프로젝트 개요

공공기관을 위한 **홈페이지 + 관리자 CMS 통합 플랫폼**.  
웹접근성(KWCAG), SEO, 보안을 기본으로 갖춘 프리미엄급 디자인 시스템을 적용하여 개발.

---

## 2. 완료된 작업 (Week 1) ✅

### 2-1. 인프라 및 기초 구축

| 항목 | 상태 | 비고 |
|------|:----:|------|
| Next.js 14 프로젝트 초기화 | ✅ | App Router, TypeScript, TailwindCSS |
| PostgreSQL + Prisma ORM | ✅ | Prisma 7.4.1, @prisma/adapter-pg |
| DB 스키마 설계 (8개 테이블) | ✅ | users, posts, attachments, pages, menus, banners, site_settings, audit_logs |
| DB 마이그레이션 & 시드 데이터 | ✅ | 3개 관리자 계정, 샘플 게시물 |
| JWT 인증 시스템 | ✅ | jose (HS256) + bcryptjs (12 rounds), HttpOnly Cookie |
| Next.js 미들웨어 (라우트 보호) | ✅ | /admin/** 경로 인증 검증 + 보안 헤더 |
| Docker / Docker Compose | ✅ | PostgreSQL + MinIO + 앱 컨테이너 |
| REST API 구현 | ✅ | auth, posts, pages, menus, banners CRUD |
| 감사 로그 (Audit Log) | ✅ | 모든 관리 작업 기록 |

### 2-2. 공개 홈페이지 (7개 페이지)

| 페이지 | 라우트 | 상태 | 주요 기능 |
|--------|--------|:----:|-----------|
| 메인 페이지 | `/` | ✅ | Hero 배너, 공지·자료 실시간 조회, 서비스 카드, CTA |
| 기관소개 | `/about` | ✅ | 인사말, 비전·미션, 핵심가치 4종, 타임라인 연혁 |
| 사업소개 | `/business` | ✅ | 통계 카드, 프로젝트 카드(진행률 바, 상태 배지) |
| 조직도 | `/organization` | ✅ | 트리형 차트, 부서 카드, 연결선, 조직 요약 |
| 오시는길 | `/contact` | ✅ | 지도 영역, 연락처 카드, 교통편, 운영시간 |
| 공지사항 | `/board/notice` | ✅ | DB 실시간 조회, 검색, 페이지네이션, NEW 배지 |
| 자료실 | `/board/archive` | ✅ | 카드 그리드, 필터 탭, 첨부파일 표시 |
| 공지사항 상세 | `/board/notice/[id]` | ✅ | 본문, 첨부파일, 이전/다음 글 네비 |

### 2-3. 관리자 CMS (10개 페이지)

| 페이지 | 라우트 | 상태 | 주요 기능 |
|--------|--------|:----:|-----------|
| 로그인 | `/admin` | ✅ | Glass-morphism UI, JWT 인증 |
| 대시보드 레이아웃 | `/admin/(dashboard)/layout` | ✅ | 접이식 사이드바, 모바일 오버레이, 7개 메뉴 |
| 대시보드 | `/admin/dashboard` | ✅ | Prisma 실시간 통계, 최근 게시물·활동 |
| 게시판 관리 | `/admin/posts` | ✅ | 필터, 검색, 테이블+카드 뷰, 페이지네이션 |
| 게시글 작성 | `/admin/posts/new` | ✅ | 폼, 카테고리, 드래그&드롭 파일 영역 |
| 페이지 관리 | `/admin/pages` | ✅ | 카드 그리드, 미리보기·편집·삭제 |
| 메뉴 관리 | `/admin/menus` | ✅ | 순서 변경, 표시/숨김 토글, 저장 |
| 배너 관리 | `/admin/banners` | ✅ | 그라데이션 프리뷰, 상태 배지, 순서 |
| 사이트 설정 | `/admin/settings` | ✅ | 4개 섹션(기본·연락처·SEO·푸터), 저장 |
| 감사 로그 | `/admin/audit-logs` | ✅ | Prisma DB 실시간 조회, 액션별 아이콘 |

### 2-4. 디자인 시스템

| 항목 | 상태 | 비고 |
|------|:----:|------|
| TailwindCSS 커스텀 테마 | ✅ | primary/accent/surface 색상 체계, 커스텀 폰트 사이즈 |
| 글로벌 컴포넌트 레이어 | ✅ | glass-card, btn-primary/secondary/ghost, badge, input-field, page-hero |
| 모바일 반응형 (sm/md/lg/xl) | ✅ | 전 페이지 적용 |
| 프리미엄 애니메이션 | ✅ | fade-in/up, slide-in, scale-in, float, gradient |
| 다크 히어로 배너 | ✅ | gradient-hero, dot-pattern, text-shadow |
| 가독성 개선 | ✅ | 텍스트 대비 강화, 행간 조정, 폰트 사이즈 최적화 |

### 2-5. 웹접근성 & SEO

| 항목 | 상태 | 비고 |
|------|:----:|------|
| 스킵 네비게이션 | ✅ | `#main-content` 바로가기 |
| 시맨틱 HTML | ✅ | header, nav, main, footer, article, section |
| ARIA 속성 | ✅ | aria-label, aria-current, aria-expanded, role |
| 키보드 접근성 | ✅ | focus-visible 스타일 (WCAG 2.1 AA) |
| 테이블 접근성 | ✅ | scope, role="table" |
| sitemap.xml / robots.txt | ✅ | Next.js App Router 자동 생성 |
| 페이지별 메타태그 | ✅ | title, description |

---

## 3. 현재 상태 (2026-02-27)

```
✅ 전체 빌드 성공 (npx next build — Compiled successfully)
✅ 개발 서버 구동 (http://localhost:3001)
✅ 전 페이지 HTTP 200 OK 확인
✅ GitHub 초기 커밋 푸시 완료 (63개 파일, 8,534 LOC)
```

### 관리자 계정

| 역할 | 이메일 | 비밀번호 |
|------|--------|----------|
| Super Admin | admin@baikal.co.kr | admin1234! |
| Editor | editor@baikal.co.kr | editor1234! |
| Viewer | viewer@baikal.co.kr | viewer1234! |

---

## 4. 향후 계획

### Phase 1: Week 2 — 핵심 기능 연동 (CMS 실사용 가능 수준)

| 우선순위 | 작업 | 설명 | 예상 |
|:--------:|------|------|:----:|
| 🔴 P0 | **관리자 CMS ↔ API 연동** | 게시물 CRUD, 페이지 CRUD, 메뉴·배너 저장이 실제 DB에 반영되도록 연동 | 2일 |
| 🔴 P0 | **파일 업로드** | S3/MinIO 연동, 이미지·첨부파일 업로드/다운로드 | 1일 |
| 🔴 P0 | **WYSIWYG 에디터** | TipTap 또는 Toast UI Editor 연동 (게시물·페이지 본문 편집) | 1일 |
| 🟡 P1 | **게시판 서버사이드 검색/페이징** | URL searchParams 기반 검색, cursor/offset 페이징 완전 연동 | 0.5일 |
| 🟡 P1 | **페이지 CMS 동적 렌더링** | 관리자가 등록한 페이지를 `/pages/[slug]` 라우트에서 렌더링 | 0.5일 |

### Phase 2: Week 3 — 품질 완성 & 배포

| 우선순위 | 작업 | 설명 | 예상 |
|:--------:|------|------|:----:|
| 🔴 P0 | **웹접근성 점검 & 보완** | axe-core 자동 검사, 색상 대비 검증, 스크린리더 테스트 | 1일 |
| 🔴 P0 | **SEO 최적화 마무리** | OG 태그, 구조화 데이터(JSON-LD), 페이지별 canonical, generateMetadata 완성 | 0.5일 |
| 🟡 P1 | **성능 최적화** | ISR (증분 정적 재생성), 이미지 최적화 (next/image), 캐싱 전략 | 1일 |
| 🟡 P1 | **E2E 테스트** | Playwright 기반 주요 시나리오 테스트 (로그인, 게시물 CRUD, 페이지 탐색) | 1일 |
| 🟡 P1 | **프로덕션 배포** | Docker 이미지 빌드, docker-compose 프로덕션 설정, 환경변수 관리 | 0.5일 |
| 🟢 P2 | **알림/토스트** | 저장 성공/실패 등 사용자 피드백 토스트 시스템 | 0.5일 |

### Phase 3: 고도화 — AI 연동 (4~6주차)

| 작업 | 설명 |
|------|------|
| **BAIKAL Private AI 연동** | 자체 AI 모델 API 연결 |
| **RAG 문서검색** | 벡터 DB(Qdrant/Pinecone) + 임베딩 기반 공문서 검색 |
| **AI 콘텐츠 작성 지원** | 게시물 자동 초안 생성, 제목 추천, 문법 교정 |
| **AI 콘텐츠 요약** | 장문 게시물 자동 요약, 핵심 키워드 추출 |
| **AI 챗봇** | 홈페이지 내 민원·FAQ 챗봇 (RAG 기반) |

### Phase 4: SaaS 플랫폼화 (7주차~)

| 작업 | 설명 |
|------|------|
| **멀티테넌시** | 기관별 독립 데이터 격리 (schema 또는 row-level) |
| **커스텀 도메인** | 기관별 자체 도메인 연결 (SSL 자동 발급) |
| **테마 시스템** | 색상·레이아웃 커스터마이징 (관리자 UI에서 설정) |
| **플러그인 구조** | 기능 모듈 On/Off (게시판 유형, 팝업, 배너 위젯 등) |
| **사용량 기반 과금** | 트래픽·스토리지·사용자 수 기반 요금 체계 |
| **SLA 모니터링** | Uptime 모니터, 성능 대시보드, 알림 |

---

## 5. 기술 부채 & 개선 사항

| 항목 | 현재 상태 | 목표 |
|------|-----------|------|
| 관리자 폼 검증 | 클라이언트 기본 | Zod 스키마 검증 (서버+클라이언트) |
| 에러 처리 | try/catch 기본 패턴 | ErrorBoundary + 전역 에러 핸들링 |
| 로딩 상태 | Partial | Suspense + Skeleton UI 전 페이지 적용 |
| 이미지 최적화 | 미적용 | next/image + blur placeholder |
| 국제화(i18n) | 한국어 only | next-intl 다국어 지원 준비 |
| 2FA 인증 | 미구현 (구조만) | TOTP 기반 2FA 구현 |
| IP 화이트리스트 | 미구현 (구조만) | 관리자 접근 IP 제한 |
| Rate Limiting | 미적용 | API Rate Limit (upstash/ratelimit) |
| 로깅 | console.log | winston/pino 구조화 로깅 |
| CI/CD | 미구성 | GitHub Actions (lint → test → build → deploy) |

---

## 6. 파일 구조 요약

```
총 63개 파일 커밋 (8,534 LOC)

src/
├── app/
│   ├── (public)/     → 7개 페이지 (SSR, Prisma 실시간 조회)
│   ├── admin/        → 10개 페이지 (CMS 관리 UI)
│   └── api/          → 8개 API 라우트 (REST CRUD)
├── components/       → 5개 공통 컴포넌트 (Header, Footer, Breadcrumb, Pagination, SearchBox)
└── lib/              → 6개 유틸 (prisma, auth, middleware, audit, api-response, utils)

prisma/
├── schema.prisma     → 8개 모델
├── seed.ts           → 초기 데이터
└── migrations/       → DB 마이그레이션
```

---

## 7. 개발 환경

| 항목 | 값 |
|------|-----|
| OS | Windows |
| Node.js | v24.13.1 |
| Next.js | 14.2.35 |
| Prisma | 7.4.1 |
| PostgreSQL | 16 (로컬 서비스) |
| 개발 서버 | http://localhost:3001 |
| DB | baikal_cms (user: baikal) |

---

*이 문서는 프로젝트 진행 상황에 따라 업데이트됩니다.*
