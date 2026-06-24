// =============================================================================
// 한영대학교 Internal AI(iStation) 구축 일정표 - 데이터 정의
// -----------------------------------------------------------------------------
// 이 파일의 값만 수정하면 화면 전체에 반영됩니다.
//  - project   : 상단 요약/Hero 정보
//  - weeks     : W1~W8 주차 정의(간트차트 열)
//  - phases    : 구축 단계 정의(색상 포함)
//  - tasks     : 간트차트 행(세부 활동) 데이터
//  - milestones: 주요 마일스톤 (M1~M5)
//  - assumptions: 전제 조건
//  - risks     : 주요 리스크 및 대응방안
// =============================================================================

// 사업 개요 -------------------------------------------------------------------
export const project = {
  title: '한영대학교 Internal AI(iStation) 구축 일정표',
  nature: '상용 패키지 기반 온프레미스·폐쇄망 Internal AI 도입',
  period: { start: '2026-06-29', end: '2026-08-20' },
  periodLabel: '2026.06.29 ~ 2026.08.20',
  finalDueDate: '2026-08-20',
  finalDueDateLabel: '2026.08.20',
  warranty: '도입완료일 후 12개월',
  keyMessage:
    '8월 14일까지 인수시험 완료, 8월 20일 도입완료보고 및 사업 종료',
}

// 주차 정의 (간트차트 열) ------------------------------------------------------
// id: W1~W8 / range: 표시 라벨 / start,end: 실제 날짜(진행 판정용)
export const weeks = [
  { id: 'W1', no: 1, range: '6/29~7/3', start: '2026-06-29', end: '2026-07-03' },
  { id: 'W2', no: 2, range: '7/6~7/10', start: '2026-07-06', end: '2026-07-10' },
  { id: 'W3', no: 3, range: '7/13~7/17', start: '2026-07-13', end: '2026-07-17' },
  { id: 'W4', no: 4, range: '7/20~7/24', start: '2026-07-20', end: '2026-07-24' },
  { id: 'W5', no: 5, range: '7/27~7/31', start: '2026-07-27', end: '2026-07-31' },
  { id: 'W6', no: 6, range: '8/3~8/7', start: '2026-08-03', end: '2026-08-07' },
  { id: 'W7', no: 7, range: '8/10~8/14', start: '2026-08-10', end: '2026-08-14' },
  { id: 'W8', no: 8, range: '8/17~8/20', start: '2026-08-17', end: '2026-08-20' },
]

// 구축 단계 정의 (색상 = 간트 막대/범례 색상) ----------------------------------
export const phases = [
  { no: 1, name: '착수·계약', color: '#1d4ed8', soft: '#dbe7ff' },
  { no: 2, name: '구축 설계', color: '#2563eb', soft: '#dce8ff' },
  { no: 3, name: '인프라 공급·설치', color: '#0891b2', soft: '#cdeef6' },
  { no: 4, name: 'iStation 설치·구성', color: '#0d9488', soft: '#cdeeea' },
  { no: 5, name: '문서 연동·지식DB 구성', color: '#7c3aed', soft: '#e6dcfb' },
  { no: 6, name: '통합시험·안정화', color: '#c026d3', soft: '#f4d9f9' },
  { no: 7, name: '인수시험', color: '#ea580c', soft: '#fde2cf' },
  { no: 8, name: '운영이관·교육·종료', color: '#0f2a52', soft: '#d2dcec' },
  { no: 9, name: '하자보수', color: '#475569', soft: '#dde3ec' },
]

export const phaseByNo = Object.fromEntries(phases.map((p) => [p.no, p]))

// 담당 구분 (필터에 사용) ------------------------------------------------------
export const owners = ['틸론', '한영대', '공동', '틸론·한영대']

// 세부 활동(간트 행) ----------------------------------------------------------
// startWeek/endWeek: 1~8 (간트 막대 범위). postProject:true 는 사업종료 후 항목.
export const tasks = [
  {
    id: 't1',
    phase: 1,
    activity: '협의체 구성 · 착수보고 · 추진계획 확정',
    deliverable: '착수보고서·추진계획서',
    owner: '틸론·한영대',
    startWeek: 1,
    endWeek: 1,
    milestone: true,
  },
  {
    id: 't2',
    phase: 1,
    activity: '요구사항·규격 최종 확인',
    deliverable: '요구사항 확인서',
    owner: '공동',
    startWeek: 1,
    endWeek: 1,
    milestone: false,
  },
  {
    id: 't3',
    phase: 2,
    activity: '환경 실사',
    deliverable: '현장실사 결과',
    owner: '틸론',
    startWeek: 1,
    endWeek: 2,
    milestone: false,
  },
  {
    id: 't4',
    phase: 2,
    activity: 'GPU 운영 인프라 권장사양 확정',
    deliverable: 'HW 규격 확정서',
    owner: '틸론',
    startWeek: 2,
    endWeek: 2,
    milestone: false,
  },
  {
    id: 't5',
    phase: 2,
    activity: '운영모델 협의',
    deliverable: '운영모델 설계서',
    owner: '공동',
    startWeek: 2,
    endWeek: 2,
    milestone: false,
  },
  {
    id: 't6',
    phase: 2,
    activity: '보안설계',
    deliverable: '보안설계서',
    owner: '틸론',
    startWeek: 2,
    endWeek: 2,
    milestone: false,
  },
  {
    id: 't7',
    phase: 3,
    activity: 'GPU 서버·장비 반입',
    deliverable: '장비 반입확인',
    owner: '틸론',
    startWeek: 4,
    endWeek: 4,
    milestone: true,
  },
  {
    id: 't8',
    phase: 4,
    activity: 'iStation 플랫폼 설치',
    deliverable: '설치 결과',
    owner: '틸론',
    startWeek: 4,
    endWeek: 5,
    milestone: false,
  },
  {
    id: 't9',
    phase: 5,
    activity: '내부 문서 수집·적재 및 튜닝',
    deliverable: '적재 내역',
    owner: '공동',
    startWeek: 4,
    endWeek: 6,
    milestone: false,
  },
  {
    id: 't10',
    phase: 6,
    activity: '시범운영 · 보완',
    deliverable: '기능시험 결과',
    owner: '공동',
    startWeek: 6,
    endWeek: 6,
    milestone: false,
  },
  {
    id: 't11',
    phase: 7,
    activity: '요구사항 정의서 항목별 충족 확인',
    deliverable: '인수시험 결과서',
    owner: '한영대',
    startWeek: 7,
    endWeek: 7,
    milestone: false,
  },
  {
    id: 't12',
    phase: 7,
    activity: '미충족 사항 보완 · 재확인',
    deliverable: '보완 결과',
    owner: '틸론',
    startWeek: 7,
    endWeek: 7,
    milestone: true,
  },
  {
    id: 't13',
    phase: 8,
    activity: '운영자·사용자 매뉴얼 제공',
    deliverable: '운영매뉴얼',
    owner: '틸론',
    startWeek: 8,
    endWeek: 8,
    milestone: false,
  },
  {
    id: 't14',
    phase: 8,
    activity: '관리자·사용자 교육',
    deliverable: '교육 결과',
    owner: '틸론',
    startWeek: 8,
    endWeek: 8,
    milestone: false,
  },
  {
    id: 't15',
    phase: 8,
    activity: '정품 라이선스 증빙 제공',
    deliverable: '라이선스 증빙',
    owner: '틸론',
    startWeek: 8,
    endWeek: 8,
    milestone: false,
  },
  {
    id: 't16',
    phase: 8,
    activity: '도입완료보고 · 사업종료',
    deliverable: '도입완료보고서',
    owner: '공동',
    startWeek: 8,
    endWeek: 8,
    milestone: true,
  },
  {
    id: 't17',
    phase: 9,
    activity: '사업종료 후 12개월 결함 수정 하자보수 제공',
    deliverable: '하자보수 지원',
    owner: '틸론',
    startWeek: 8,
    endWeek: 8,
    milestone: false,
    postProject: true,
    periodLabel: '사업종료 후 12개월',
  },
]

// 주요 마일스톤 (M1~M5) -------------------------------------------------------
export const milestones = [
  {
    id: 'M1',
    title: '착수보고 완료',
    target: 'W1, 6/29',
    date: '2026-06-29',
    note: '협의체 구성·추진계획 확정',
  },
  {
    id: 'M2',
    title: '인프라 구축 완료',
    target: 'W3 ~ W4',
    date: '2026-07-24',
    note: '폐쇄망·GPU 인프라 검증 완료',
  },
  {
    id: 'M3',
    title: '플랫폼·지식DB 구성 완료',
    target: 'W5, 7/31',
    date: '2026-07-31',
    note: 'iStation 플랫폼 설치 및 문서 인덱싱 완료',
  },
  {
    id: 'M4',
    title: '인수시험 완료',
    target: 'W7, 8/14',
    date: '2026-08-14',
    note: '요구사항 충족 확인·보완',
  },
  {
    id: 'M5',
    title: '도입완료보고·사업종료',
    target: 'W8, 8/20',
    date: '2026-08-20',
    note: '도입완료보고서 제출',
  },
]

// 전제 조건 -------------------------------------------------------------------
export const assumptions = [
  '본 일정은 사업종료일 2026.08.20을 기준으로 역산한 8주 표준 일정입니다.',
  '실제 착수일 또는 계약 확정일에 따라 세부 일정은 조정될 수 있습니다.',
  '본 일정은 설치·구성·연동·검증·교육·이관 활동으로 구성됩니다.',
  '맞춤개발 등 별도 개발 과업은 포함하지 않습니다.',
  '내부 문서 제공 범위와 권한 체계는 한영대학교가 사전에 확정해야 합니다.',
  '문서 인덱싱 단계 전에 샘플 문서와 권한 기준이 제공되어야 합니다.',
]

// 주요 리스크 및 대응 ---------------------------------------------------------
// level: '높음' | '중간' | '낮음'
export const risks = [
  {
    id: 'R1',
    name: 'GPU 서버 등 HW 반입 리드타임',
    action: '계약 직후 즉시 발주하고, W2 내 반입 일정을 사전 확보합니다.',
    level: '높음',
  },
  {
    id: 'R2',
    name: '폐쇄망 보안정책·방화벽 협의 지연',
    action: 'W1 환경 실사 시 한영대 정보보안 담당자가 함께 참여하도록 합니다.',
    level: '높음',
  },
  {
    id: 'R3',
    name: '내부 문서 권한 체계 확정 지연',
    action:
      'W1~W2 내 권한 매핑 기준을 합의하고, 인덱싱 착수 전 데이터를 확정합니다.',
    level: '중간',
  },
  {
    id: 'R4',
    name: '8/15 광복절 및 하계 휴가 일정',
    action:
      '검증·종료 단계인 W6~W8의 연구소 및 고객사 담당자 일정을 사전 확보합니다.',
    level: '중간',
  },
]
