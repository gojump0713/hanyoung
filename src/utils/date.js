// =============================================================================
// 날짜 계산 유틸 - 진행률 / 현재 주차 / D-day 계산
// =============================================================================

const MS_PER_DAY = 1000 * 60 * 60 * 24

/** 'YYYY-MM-DD' 문자열을 로컬 자정 기준 Date로 파싱 (타임존 영향 최소화) */
export function parseDate(str) {
  if (str instanceof Date) return str
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** 시간 성분을 제거한 자정 기준 Date 반환 */
export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/** 두 날짜 사이의 일수 차이 (b - a), 정수 일 단위 */
export function diffDays(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / MS_PER_DAY)
}

/**
 * 사업 진행률(%) 계산.
 * - today < start  → 0
 * - today > end    → 100
 * - 그 외          → 경과일 / 전체일 * 100 (소수 1자리 반올림)
 */
export function getProgress(startStr, endStr, today = new Date()) {
  const start = startOfDay(parseDate(startStr))
  const end = startOfDay(parseDate(endStr))
  const now = startOfDay(today)

  if (now <= start) return 0
  if (now >= end) return 100

  const total = diffDays(start, end)
  const elapsed = diffDays(start, now)
  return Math.round((elapsed / total) * 1000) / 10
}

/**
 * 오늘이 속한 주차를 weeks 배열에서 찾아 반환.
 * - 시작 전 → { state: 'before' }
 * - 종료 후 → { state: 'after' }
 * - 진행 중 → { state: 'during', week, index }
 *   (주차 사이의 주말/공백 구간이면 직전 주차로 매핑)
 */
export function getCurrentWeek(weeks, today = new Date()) {
  const now = startOfDay(today)
  const first = startOfDay(parseDate(weeks[0].start))
  const last = startOfDay(parseDate(weeks[weeks.length - 1].end))

  if (now < first) return { state: 'before', week: null, index: -1 }
  if (now > last) return { state: 'after', week: null, index: -1 }

  // 정확히 주차 범위에 들면 그 주차
  for (let i = 0; i < weeks.length; i++) {
    const ws = startOfDay(parseDate(weeks[i].start))
    const we = startOfDay(parseDate(weeks[i].end))
    if (now >= ws && now <= we) {
      return { state: 'during', week: weeks[i], index: i }
    }
  }
  // 주차 사이(주말 등)면 가장 가까운 직전 주차로 매핑
  for (let i = weeks.length - 1; i >= 0; i--) {
    const we = startOfDay(parseDate(weeks[i].end))
    if (now > we) return { state: 'during', week: weeks[i], index: i }
  }
  return { state: 'during', week: weeks[0], index: 0 }
}

/**
 * 최종 종료일까지 남은 일수.
 * 음수면 이미 종료(경과)된 상태.
 */
export function daysUntil(targetStr, today = new Date()) {
  return diffDays(startOfDay(today), parseDate(targetStr))
}

/** D-day 라벨 문자열 ("D-57" / "D-DAY" / "종료 (+3일)") */
export function ddayLabel(targetStr, today = new Date()) {
  const d = daysUntil(targetStr, today)
  if (d > 0) return `D-${d}`
  if (d === 0) return 'D-DAY'
  return `종료 (+${Math.abs(d)}일)`
}

/** 'YYYY-MM-DD' → '2026.08.20' 형식 */
export function formatDot(str) {
  return str.replaceAll('-', '.')
}

/** 오늘 날짜를 'YYYY.MM.DD (요일)' 형식으로 */
export function formatToday(today = new Date()) {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const y = today.getFullYear()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  return `${y}.${m}.${d} (${days[today.getDay()]})`
}
