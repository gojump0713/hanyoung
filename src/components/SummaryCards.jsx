// 상단 요약 카드: 총 사업기간 / 총 단계 수 / 마일스톤 수 / 최종 종료일 / 핵심 리스크
import { diffDays } from '../utils/date'

function Card({ icon, label, value, sub, accent = 'navy' }) {
  const accents = {
    navy: 'from-navy-700 to-navy-600 text-white',
    blue: 'from-brand-blue to-brand-light text-white',
    sky: 'bg-white text-navy-700 border border-slate-200',
    red: 'from-rose-600 to-red-500 text-white',
  }
  const isGradient = accent !== 'sky'
  return (
    <div
      className={`summary-card flex flex-col justify-between rounded-xl p-4 shadow-card transition hover:shadow-cardhover ${
        isGradient ? `bg-gradient-to-br ${accents[accent]}` : accents[accent]
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${isGradient ? 'text-white/80' : 'text-slate-500'}`}>
          {label}
        </span>
        <span className={`text-lg ${isGradient ? 'text-white/70' : 'text-brand-blue'}`}>{icon}</span>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold leading-none tracking-tight">{value}</p>
        {sub && (
          <p className={`mt-1.5 text-xs ${isGradient ? 'text-white/75' : 'text-slate-500'}`}>{sub}</p>
        )}
      </div>
    </div>
  )
}

export default function SummaryCards({ project, phases, milestones, risks }) {
  const totalDays = diffDays(project.period.start, project.period.end) + 1
  const weeksCount = Math.ceil(totalDays / 7)
  // 하자보수(9단계)는 사업 본 단계에서 제외하고 본 구축 단계만 카운트
  const phaseCount = phases.filter((p) => p.no <= 8).length
  const topRisk = risks.find((r) => r.level === '높음')

  return (
    <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        <Card
          accent="navy"
          icon="🗓️"
          label="총 사업기간"
          value={`${weeksCount}주`}
          sub={`${project.periodLabel} (${totalDays}일)`}
        />
        <Card
          accent="blue"
          icon="🧩"
          label="총 단계 수"
          value={`${phaseCount}단계`}
          sub="착수~종료 (하자보수 별도)"
        />
        <Card
          accent="sky"
          icon="◆"
          label="주요 마일스톤"
          value={`${milestones.length}개`}
          sub="M1 ~ M5"
        />
        <Card
          accent="sky"
          icon="🏁"
          label="최종 종료일"
          value={project.finalDueDateLabel}
          sub="도입완료보고 · 사업종료"
        />
        <Card
          accent="red"
          icon="⚠"
          label="핵심 리스크"
          value={topRisk ? topRisk.name.length > 12 ? 'HW 반입 리드타임' : topRisk.name : '-'}
          sub={`위험도 높음 ${risks.filter((r) => r.level === '높음').length}건`}
        />
      </div>
    </section>
  )
}
