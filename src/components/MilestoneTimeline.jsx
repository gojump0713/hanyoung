// 주요 마일스톤 M1~M5 타임라인
import { parseDate, startOfDay, ddayLabel } from '../utils/date'

export default function MilestoneTimeline({ milestones, today }) {
  const now = startOfDay(today)
  // 상태 판정: 지난 마일스톤은 완료, 가장 가까운 미래 1건은 진행예정(강조)
  const enriched = milestones.map((m) => ({
    ...m,
    passed: startOfDay(parseDate(m.date)) < now,
  }))
  const nextIdx = enriched.findIndex((m) => !m.passed)

  return (
    <div className="print-card rounded-xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="relative">
        {/* 연결선 (데스크탑) */}
        <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-slate-200 lg:block" />

        <ol className="grid gap-5 lg:grid-cols-5 lg:gap-3">
          {enriched.map((m, i) => {
            const isNext = i === nextIdx
            const done = m.passed
            return (
              <li key={m.id} className="relative flex gap-4 lg:flex-col lg:gap-0">
                {/* 노드 */}
                <div className="flex flex-col items-center lg:items-start">
                  <span
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ring-4 ring-white ${
                      done
                        ? 'bg-emerald-500 text-white'
                        : isNext
                          ? 'bg-brand-blue text-white'
                          : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {done ? '✓' : '◆'}
                  </span>
                  {/* 세로 연결선 (모바일) */}
                  {i < enriched.length - 1 && (
                    <span className="mt-1 h-full w-0.5 grow bg-slate-200 lg:hidden" />
                  )}
                </div>

                {/* 내용 */}
                <div className="pb-4 lg:pb-0 lg:pr-3 lg:pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-blue">{m.id}</span>
                    {isNext && (
                      <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-semibold text-brand-blue">
                        {ddayLabel(m.date, today)}
                      </span>
                    )}
                    {done && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                        완료
                      </span>
                    )}
                  </div>
                  <h4 className="mt-1 text-sm font-bold leading-snug text-navy-700">{m.title}</h4>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">목표: {m.target}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{m.note}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
