// 간트차트 제어 툴바: 검색 / 담당자 필터 / 단계 필터 / 마일스톤만 보기 / 인쇄 / CSV
export default function Toolbar({
  search,
  setSearch,
  ownerFilter,
  setOwnerFilter,
  phaseFilter,
  setPhaseFilter,
  milestoneOnly,
  setMilestoneOnly,
  owners,
  phases,
  onPrint,
  onExportCsv,
  resultCount,
  totalCount,
}) {
  const hasFilter =
    search || ownerFilter !== 'all' || phaseFilter !== 'all' || milestoneOnly
  const reset = () => {
    setSearch('')
    setOwnerFilter('all')
    setPhaseFilter('all')
    setMilestoneOnly(false)
  }

  return (
    <div className="no-print mb-4 rounded-xl border border-slate-200 bg-white p-3 shadow-card sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* 검색 + 필터 */}
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          {/* 검색 */}
          <div className="relative sm:w-64">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="활동명·산출물 검색"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm text-navy-700 outline-none transition focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>

          {/* 담당자 필터 */}
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-navy-700 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          >
            <option value="all">담당자 전체</option>
            {owners.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>

          {/* 단계 필터 */}
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="max-w-[200px] rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-navy-700 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          >
            <option value="all">단계 전체</option>
            {phases.map((p) => (
              <option key={p.no} value={String(p.no)}>
                {p.no}. {p.name}
              </option>
            ))}
          </select>

          {/* 마일스톤만 보기 */}
          <label className="inline-flex cursor-pointer select-none items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy-700 transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={milestoneOnly}
              onChange={(e) => setMilestoneOnly(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-brand-blue/30"
            />
            <span className="text-amber-500">◆</span> 마일스톤만
          </label>

          {hasFilter && (
            <button
              onClick={reset}
              className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-brand-blue hover:underline"
            >
              필터 초기화
            </button>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-2">
          <span className="mr-1 hidden text-xs text-slate-500 sm:inline">
            {resultCount}/{totalCount} 항목
          </span>
          <button
            onClick={onExportCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-slate-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            CSV
          </button>
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-navy-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
            </svg>
            인쇄
          </button>
        </div>
      </div>
    </div>
  )
}
