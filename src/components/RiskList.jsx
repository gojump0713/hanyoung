// 주요 리스크 및 대응방안 (위험도 높음 강조)
const levelStyle = {
  높음: {
    badge: 'bg-rose-500 text-white',
    border: 'border-rose-200',
    bar: 'bg-rose-500',
    dot: 'bg-rose-500',
  },
  중간: {
    badge: 'bg-amber-400 text-amber-950',
    border: 'border-amber-200',
    bar: 'bg-amber-400',
    dot: 'bg-amber-400',
  },
  낮음: {
    badge: 'bg-emerald-400 text-emerald-950',
    border: 'border-emerald-200',
    bar: 'bg-emerald-400',
    dot: 'bg-emerald-400',
  },
}

export default function RiskList({ risks }) {
  const count = (lv) => risks.filter((r) => r.level === lv).length
  return (
    <div className="print-card h-full rounded-xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      {/* 위험도 범례 + 집계 */}
      <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3 text-xs">
        <span className="font-semibold text-navy-700">위험도</span>
        {['높음', '중간', '낮음'].map((lv) => {
          const s = levelStyle[lv]
          return (
            <span key={lv} className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1">
              <span className={`h-2 w-2 rounded-full ${s.dot}`} />
              <span className="text-slate-600">{lv}</span>
              <span className={`rounded-full px-1.5 text-[10px] font-bold ${s.badge}`}>{count(lv)}</span>
            </span>
          )
        })}
      </div>
      <ul className="space-y-3">
        {risks.map((r) => {
          const s = levelStyle[r.level] || levelStyle['중간']
          return (
            <li
              key={r.id}
              className={`relative overflow-hidden rounded-lg border ${s.border} bg-white p-4 pl-5 shadow-sm transition hover:shadow-cardhover`}
            >
              <span className={`absolute left-0 top-0 h-full w-1.5 ${s.bar}`} />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-slate-400">{r.id}</span>
                  <h4 className="text-sm font-bold leading-snug text-navy-700">{r.name}</h4>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${s.badge}`}>
                  {r.level}
                </span>
              </div>
              <div className="mt-2 flex items-start gap-1.5 pl-6">
                <span className="mt-0.5 text-xs font-semibold text-brand-blue">대응</span>
                <p className="text-xs leading-relaxed text-slate-600">{r.action}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
