// 전제 조건 체크리스트
export default function AssumptionList({ assumptions }) {
  return (
    <div className="print-card h-full rounded-xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <ul className="space-y-3">
        {assumptions.map((text, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-sky text-brand-blue">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-sm leading-relaxed text-slate-600">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
