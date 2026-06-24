// 8주차 구축 일정 간트차트 (고도화)
// - W1~W8 헤더 상단 고정(sticky top)
// - 활동명 / 산출물 / 담당 좌측 컬럼 고정(sticky left)
// - 둥근 막대, 마일스톤 ◆ 강조, 단계별 색상, 오늘 주차 하이라이트
// - 모바일: 활동명만 고정 + 가로 스크롤
import { phaseByNo } from '../data/scheduleData'

const ownerStyle = {
  틸론: 'bg-blue-50 text-blue-700 ring-blue-200',
  한영대: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  공동: 'bg-violet-50 text-violet-700 ring-violet-200',
  '틸론·한영대': 'bg-cyan-50 text-cyan-700 ring-cyan-200',
}

function OwnerBadge({ owner }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${ownerStyle[owner] || 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
      {owner}
    </span>
  )
}

export default function GanttChart({ weeks, tasks, currentIndex }) {
  // 단계별 그룹화
  const grouped = []
  for (const t of tasks) {
    let g = grouped.find((x) => x.phase === t.phase)
    if (!g) {
      g = { phase: t.phase, items: [] }
      grouped.push(g)
    }
    g.items.push(t)
  }
  grouped.sort((a, b) => a.phase - b.phase)

  return (
    <div className="print-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      {/* 범례 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 bg-slate-50/60 px-4 py-3 text-xs text-slate-500">
        <span className="font-semibold text-navy-700">단계 범례</span>
        {Object.values(phaseByNo).map((p) => (
          <span key={p.no} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
            {p.no}. {p.name}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 font-medium text-amber-500">
          <span>◆</span> <span className="text-slate-500">마일스톤</span>
        </span>
      </div>

      {/* 스크롤 영역: 세로(헤더 고정) + 가로(좌측 컬럼 고정) */}
      <div className="gantt-scroll thin-scrollbar max-h-[72vh] overflow-auto">
        <div className="min-w-[760px]">
          {/* ===== 헤더 (sticky top) ===== */}
          <div className="gantt-grid sticky top-0 z-30">
            {/* 좌측 고정 헤더 3컬럼 */}
            <div className="sticky left-0 z-40 flex items-center border-b border-r border-slate-200 bg-navy-700 px-3 py-2.5 text-xs font-semibold text-white">
              세부 활동
            </div>
            <div className="z-40 hidden items-center border-b border-r border-slate-200 bg-navy-700 px-3 py-2.5 text-xs font-semibold text-white md:sticky md:left-[200px] md:flex">
              산출물
            </div>
            <div className="z-40 hidden items-center justify-center border-b border-r border-slate-200 bg-navy-700 px-2 py-2.5 text-xs font-semibold text-white md:sticky md:left-[330px] md:flex">
              담당
            </div>
            {/* 주차 헤더 */}
            {weeks.map((w, i) => (
              <div
                key={w.id}
                className={`flex flex-col items-center justify-center border-b border-l border-slate-200 py-2 text-center ${
                  i === currentIndex ? 'bg-brand-blue text-white' : 'bg-navy-700 text-white'
                }`}
              >
                <span className="text-xs font-bold">{w.id}</span>
                <span className={`text-[10px] ${i === currentIndex ? 'text-sky-100' : 'text-sky-200/80'}`}>
                  {w.range}
                </span>
                {i === currentIndex && (
                  <span className="mt-0.5 rounded-full bg-white px-1.5 text-[9px] font-bold text-brand-blue">
                    오늘
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ===== 본문 ===== */}
          {grouped.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-slate-400">
              조건에 해당하는 일정이 없습니다.
            </div>
          )}

          {grouped.map((group) => {
            const p = phaseByNo[group.phase]
            return (
              <div key={group.phase} className="print-keep">
                {/* 단계 헤더 밴드 */}
                <div className="gantt-grid border-b border-slate-100">
                  <div
                    className="sticky left-0 z-20 flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-navy-700"
                    style={{ background: p.soft, borderLeft: `4px solid ${p.color}`, gridColumn: '1 / 4' }}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: p.color }}>
                      {p.no}
                    </span>
                    <span className="truncate">{p.name}</span>
                  </div>
                  {weeks.map((w, i) => (
                    <div
                      key={w.id}
                      style={{ background: i === currentIndex ? '#e0f2fe' : p.soft, opacity: 0.45, gridColumn: i + 4 }}
                    />
                  ))}
                </div>

                {/* 활동 행 */}
                {group.items.map((t) => {
                  const stickyBg = t.milestone ? 'bg-amber-50' : 'bg-white'
                  return (
                  <div
                    key={t.id}
                    className={`gantt-grid items-stretch border-b border-slate-50 ${
                      t.milestone ? 'bg-amber-50/40' : ''
                    } hover:bg-slate-50/70`}
                  >
                    {/* 활동명 (고정) */}
                    <div className={`sticky left-0 z-20 flex flex-col justify-center gap-1 border-r border-slate-100 px-3 py-2.5 ${stickyBg}`}>
                      <div className="flex items-start gap-1.5">
                        {t.milestone && (
                          <span className="mt-0.5 shrink-0 text-sm leading-none text-amber-500">◆</span>
                        )}
                        <span className={`text-[13px] leading-snug ${t.milestone ? 'font-semibold text-navy-700' : 'font-medium text-navy-700'}`}>
                          {t.activity}
                        </span>
                      </div>
                      {/* 모바일에서는 산출물·담당을 활동명 셀 안에 노출 */}
                      <div className="flex flex-wrap items-center gap-1.5 md:hidden">
                        <OwnerBadge owner={t.owner} />
                        <span className="text-[10px] text-slate-400">{t.deliverable}</span>
                      </div>
                    </div>

                    {/* 산출물 (고정, 데스크탑) */}
                    <div className={`z-20 hidden items-center border-r border-slate-100 px-3 py-2.5 text-[11px] leading-snug text-slate-500 md:sticky md:left-[200px] md:flex ${stickyBg}`}>
                      {t.deliverable}
                    </div>

                    {/* 담당 (고정, 데스크탑) */}
                    <div className={`z-20 hidden items-center justify-center border-r border-slate-100 px-2 py-2.5 md:sticky md:left-[330px] md:flex ${stickyBg}`}>
                      <OwnerBadge owner={t.owner} />
                    </div>

                    {/* 배경 트랙 셀 */}
                    {weeks.map((w, i) => (
                      <div
                        key={w.id}
                        className={`border-l border-slate-100 ${i === currentIndex ? 'bg-sky-50' : ''}`}
                        style={{ gridColumn: i + 4, gridRow: 1 }}
                      />
                    ))}

                    {/* 기간 막대 (둥근 모서리) */}
                    <div
                      className="z-[1] flex items-center px-1.5 py-2"
                      style={{ gridColumn: `${t.startWeek + 3} / ${t.endWeek + 4}`, gridRow: 1 }}
                    >
                      <div
                        className={`group flex h-7 w-full items-center justify-between gap-1 rounded-full px-2.5 text-[11px] font-semibold text-white shadow-sm ring-1 ring-black/5 transition ${
                          t.milestone ? 'ring-2 ring-amber-300' : ''
                        }`}
                        style={
                          t.postProject
                            ? {
                                background: `repeating-linear-gradient(45deg, ${p.color}, ${p.color} 6px, rgba(255,255,255,0.28) 6px, rgba(255,255,255,0.28) 12px)`,
                              }
                            : { background: p.color }
                        }
                        title={`${t.activity} (${t.postProject ? t.periodLabel : `${weeks[t.startWeek - 1].id}~${weeks[t.endWeek - 1].id}`})`}
                      >
                        <span className="truncate">
                          {t.postProject
                            ? t.periodLabel
                            : t.startWeek === t.endWeek
                              ? weeks[t.startWeek - 1].id
                              : `${weeks[t.startWeek - 1].id}~${weeks[t.endWeek - 1].id}`}
                        </span>
                        {t.milestone && (
                          <span className="shrink-0 text-[13px] leading-none text-amber-200 drop-shadow">◆</span>
                        )}
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
