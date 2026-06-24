# 한영대학교 Internal AI(iStation) 구축 일정표

상용 패키지 기반 온프레미스·폐쇄망 Internal AI 도입 사업의 **8주 구축 일정**을 한 화면에서 확인할 수 있는 단일 페이지 웹앱입니다. 한영대학교·틸론 연구소·PM·영업 담당자가 일정, 마일스톤, 전제조건, 리스크를 공유하는 용도로 사용합니다.

- **사업기간**: 2026.06.29 ~ 2026.08.20
- **최종 종료일**: 2026.08.20 (도입완료보고·사업종료)
- **하자보수**: 도입완료일 후 12개월

## 기술 스택

| 구분 | 내용 |
|------|------|
| 프레임워크 | React 18 + Vite 6 |
| 스타일 | Tailwind CSS 3 |
| 형태 | 단일 페이지(SPA), 백엔드 없음(정적 배포) |
| 데이터 | 코드 내부 JSON 배열 (`src/data/scheduleData.js`) |
| 배포 | GitHub Pages / Vercel |

## 주요 기능

- 상단 **Hero**: 사업명·사업기간·최종 종료일·하자보수·핵심 일정 메시지 + 진행률 도넛 + **최종 종료일까지 남은 기간(D-day)**
- **요약 카드**: 총 사업기간 / 총 단계 수 / 마일스톤 수 / 최종 종료일 / 핵심 리스크
- **간트차트(W1~W8)**: 단계별 색상 막대, 마일스톤 ◆ 표시, 오늘 주차 하이라이트, 모바일 가로 스크롤
- **검색**(활동명·산출물) / **필터**(담당자·단계) / **마일스톤만 보기 토글**
- **오늘 날짜 기준 진행률** 및 **현재 주차** 자동 계산 (시작 전 0% / 종료 후 100%)
- **인쇄용 보기** 버튼 / **CSV 다운로드** 버튼
- **마일스톤 타임라인**, **전제조건 체크리스트**, **리스크 카드**(위험도 높음 강조)
- 반응형(PC·모바일) 디자인 — 네이비/화이트/라이트블루/그레이 기반 B2B 대시보드 톤
- **Hero 인터랙션**: 진행률·D-day 카운트업, 배경 패럴럭스/부유 애니메이션, 등장(reveal) 효과 (모션 최소화 설정 존중)
- **간트 고정 헤더**: W1~W8 헤더 상단 고정 + 활동명/산출물/담당 좌측 컬럼 고정(데스크탑), 모바일은 활동명 고정 + 가로 스크롤
- **인쇄 최적화**: A4 가로, 배경색 최소화, 버튼·필터 숨김, 간트·마일스톤 한 화면 정리(`@media print`)

---

## 1. 로컬 실행 방법

> Node.js 18 이상 필요 (권장 20 LTS)

```bash
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행 (HMR)
npm run dev
# → http://localhost:5173/hanyoung/ 접속

# 3) 프로덕션 빌드
npm run build        # 결과물: dist/

# 4) 빌드 결과 로컬 미리보기
npm run preview
# → http://localhost:4173/hanyoung/
```

## 2. Vercel 배포 방법

Vercel은 루트 경로(`/`)로 서비스되므로 `vercel.json`에 `DEPLOY_TARGET=root` 빌드 옵션을 미리 설정해 두었습니다.

**방법 A — 대시보드 (권장)**
1. [vercel.com](https://vercel.com) 로그인 → **Add New → Project**
2. 이 GitHub 저장소(`gojump0713/hanyoung`) 선택 → Import
3. Framework Preset가 **Vite**로 자동 인식됨 (Build/Output 설정은 `vercel.json`이 처리)
4. **Deploy** 클릭 → 발급된 `*.vercel.app` 도메인으로 접속

**방법 B — CLI**
```bash
npm i -g vercel
vercel        # 미리보기 배포
vercel --prod # 프로덕션 배포
```

> 참고: `vercel.json`에 SPA rewrite가 포함되어 새로고침·딥링크에도 정상 동작합니다.

## 3. GitHub Pages 배포 방법

저장소가 `gojump0713/hanyoung` 이므로 사이트 주소는 **https://gojump0713.github.io/hanyoung/** 이며, `vite.config.js`의 `base`가 `/hanyoung/`로 설정되어 있습니다.

**방법 A — gh-pages 브랜치 배포 (현재 적용된 방식)**
```bash
npm run deploy   # build 후 dist/를 gh-pages 브랜치로 push
```
이후 **Settings → Pages → Source**를 `gh-pages` 브랜치 `/ (root)`로 지정합니다.
(본 저장소는 이 방식으로 이미 배포되어 있습니다.)

**방법 B — GitHub Actions 자동 배포 (선택)**
`main` push 시 자동 빌드·배포하려면 아래 워크플로를 `.github/workflows/deploy.yml`로 추가하고,
저장소 **Settings → Pages → Source**를 **GitHub Actions**로 설정하세요.
> ⚠️ 워크플로 파일 push에는 토큰에 `workflow` 스코프가 필요합니다
> (`gh auth refresh -s workflow` 또는 PAT에 workflow 권한 부여).

<details><summary>deploy.yml 전체 보기</summary>

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
</details>

## 4. 주요 파일 구조

```
hanyoung/
├─ index.html                  # HTML 진입점 (Pretendard 폰트, 파비콘)
├─ vite.config.js              # base 경로(/hanyoung/) · React 플러그인
├─ tailwind.config.js          # 색상 토큰(navy/brand) · 폰트
├─ postcss.config.js
├─ vercel.json                 # Vercel 배포 설정(root base + SPA rewrite)
├─ public/
│  └─ logo_basic.jpg           # 한영대학교 로고
└─ src/
   ├─ main.jsx                 # React 진입
   ├─ App.jsx                  # 전체 레이아웃 · 상태(검색/필터) · CSV/인쇄
   ├─ index.css                # Tailwind · 인쇄/스크롤바 스타일
   ├─ data/
   │  └─ scheduleData.js       # ★ 모든 일정 데이터 (JSON 배열)
   ├─ utils/
   │  └─ date.js               # 진행률 · 현재 주차 · D-day 계산
   ├─ hooks/
   │  └─ useCountUp.js         # Hero 숫자 카운트업 애니메이션
   └─ components/
      ├─ Header.jsx            # Hero(사업 요약 · 진행률 · D-day)
      ├─ SummaryCards.jsx      # 요약 카드 5종
      ├─ Toolbar.jsx           # 검색/필터/토글/인쇄/CSV
      ├─ GanttChart.jsx        # 8주차 간트차트
      ├─ MilestoneTimeline.jsx # 마일스톤 M1~M5
      ├─ AssumptionList.jsx    # 전제조건 체크리스트
      ├─ RiskList.jsx          # 리스크 카드
      └─ Footer.jsx            # 푸터
```

## 5. 수정해야 할 데이터 위치

**모든 일정/내용 데이터는 `src/data/scheduleData.js` 한 파일에서 관리합니다.** 코드 수정 없이 이 파일의 값만 바꾸면 화면 전체에 반영됩니다.

| 수정 대상 | 변수 | 비고 |
|-----------|------|------|
| 사업명·사업기간·종료일·하자보수·핵심 메시지 | `project` | Hero/요약카드에 반영. `period.start/end`는 진행률 계산 기준 |
| 주차 정의(W1~W8, 날짜) | `weeks` | 간트차트 열. `start/end` 날짜로 오늘 주차 판정 |
| 구축 단계·색상 | `phases` | `color`(막대), `soft`(밴드 배경) |
| 간트 활동(행) | `tasks` | `startWeek`~`endWeek`(1~8), `owner`, `milestone`, `postProject` |
| 주요 마일스톤 | `milestones` | M1~M5, `date`는 D-day/완료 판정 기준 |
| 전제 조건 | `assumptions` | 문자열 배열 |
| 리스크 | `risks` | `level`: `'높음' \| '중간' \| '낮음'` (높음=강조색) |

> **진행률·D-day는 자동 계산**됩니다. 기준일은 접속한 사용자의 **오늘 날짜**이며, 사업 시작(`2026-06-29`) 전이면 0%, 종료(`2026-08-20`) 후면 100%로 표시됩니다. 별도 수정이 필요 없습니다.

### 데이터 수정 예시 — 활동 1건 추가
```js
// src/data/scheduleData.js → tasks 배열에 추가
{
  id: 't18',
  phase: 4,                       // 단계 번호 (phases와 매칭)
  activity: '추가 검증 작업',
  deliverable: '검증 결과서',
  owner: '틸론',                  // owners 배열의 값 중 하나
  startWeek: 5,                   // W5
  endWeek: 6,                     // ~W6
  milestone: false,
}
```

---

© 2026 Tilon · 한영대학교 Internal AI(iStation) 구축 사업
