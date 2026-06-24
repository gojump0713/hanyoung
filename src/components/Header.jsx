import { useEffect, useRef, useState } from 'react'
import { ddayLabel, daysUntil, formatToday } from '../utils/date'
import { useCountUp } from '../hooks/useCountUp'

const logoUrl = `${import.meta.env.BASE_URL}logo_basic.jpg`

// 진행률 도넛 (SVG) — 퍼센트 카운트업 연동
function ProgressRing({ percent }) {
  const animated = useCountUp(percent, { duration: 1400, decimals: 1 })
  const r = 46
  const c = 2 * Math.PI * r
  const offset = c - (animated / 100) * c
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="9" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{animated}%</span>
        <span className="text-[11px] text-sky-200">진행률</span>
      </div>
    </div>
  )
}

export default function Header({ project, progress, currentWeek, today }) {
  const dday = ddayLabel(project.finalDueDate, today)
  const ddayNum = daysUntil(project.finalDueDate, today)
  const animatedDday = useCountUp(Math.abs(ddayNum), { duration: 1400 })
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  // 등장 애니메이션 트리거
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // 마우스 패럴럭스 (배경 장식)
  const onMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setParallax({ x, y })
  }

  const weekBadge =
    currentWeek.state === 'before'
      ? '사업 시작 전'
      : currentWeek.state === 'after'
        ? '사업 종료'
        : `현재 ${currentWeek.week.id} (${currentWeek.week.range})`

  const ddayDisplay = ddayNum > 0 ? `D-${animatedDday}` : ddayNum === 0 ? 'D-DAY' : dday

  return (
    <header
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="hero-section relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-navy-600 text-white"
    >
      {/* 배경 장식 (패럴럭스 + 부유 애니메이션) */}
      <div
        className="hero-blob pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl"
        style={{ transform: `translate(${parallax.x * 30}px, ${parallax.y * 30}px)` }}
      />
      <div
        className="hero-blob pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
        style={{ transform: `translate(${parallax.x * -24}px, ${parallax.y * -24}px)`, animationDelay: '1.5s' }}
      />
      {/* 미세 그리드 패턴 */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* 상단 바 */}
      <div className="no-print relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 items-center rounded-md bg-white px-2.5 shadow-sm">
              <img src={logoUrl} alt="한영대학교" className="h-6 w-auto object-contain" />
            </span>
            <span className="hidden text-sm font-medium text-sky-100 sm:inline">
              한영대학교 × Tilon iStation
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-sky-200">
            <span className="hidden sm:inline">기준일</span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-white">
              {formatToday(today)}
            </span>
          </div>
        </div>
      </div>

      {/* Hero 본문 */}
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div
            className={`max-w-3xl transition-all duration-700 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-white/5 px-3 py-1 text-xs font-medium text-sky-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-300" />
              Internal AI 구축 사업 일정표
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">
              {project.title}
            </h1>
            <p className="mt-3 text-sm text-sky-100/90 sm:text-base">{project.nature}</p>

            {/* 핵심 정보 라인 */}
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 sm:max-w-xl">
              <Info label="사업기간" value={project.periodLabel} delay={mounted} i={0} />
              <Info label="최종 종료일" value={project.finalDueDateLabel} highlight delay={mounted} i={1} />
              <Info label="하자보수" value={project.warranty} delay={mounted} i={2} />
              <Info label="현재 위치" value={weekBadge} delay={mounted} i={3} />
            </dl>

            {/* 핵심 일정 메시지 */}
            <div
              className={`mt-6 flex items-start gap-2 rounded-lg border border-sky-300/20 bg-sky-400/5 px-4 py-3 text-sm text-sky-100 transition-all duration-700 ${
                mounted ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span><b className="font-semibold text-white">핵심 관리 기준</b> · {project.keyMessage}</span>
            </div>
          </div>

          {/* 진행률 / D-day 카드 */}
          <div
            className={`flex shrink-0 flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-700 ease-out sm:flex-row lg:flex-col ${
              mounted ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <ProgressRing percent={progress} />
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-sky-300">최종 종료일까지</p>
              <p className="mt-1 text-3xl font-bold text-white">{ddayDisplay}</p>
              <p className="mt-1 text-xs text-sky-200">{project.finalDueDateLabel} 사업 종료</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function Info({ label, value, highlight, delay, i }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${delay ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
      style={{ transitionDelay: `${150 + i * 90}ms` }}
    >
      <dt className="text-xs text-sky-300">{label}</dt>
      <dd className={`mt-0.5 text-sm font-semibold sm:text-base ${highlight ? 'text-sky-200' : 'text-white'}`}>
        {value}
      </dd>
    </div>
  )
}
