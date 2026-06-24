export default function Footer({ project }) {
  return (
    <footer className="mt-12 border-t border-navy-800 bg-navy-800 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold tracking-wide">Tilon iStation Project Schedule</p>
          <p className="mt-1 text-xs text-sky-200/80">{project.title}</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs uppercase tracking-wider text-sky-300">Final Due Date</p>
          <p className="text-lg font-bold text-sky-100">{project.finalDueDateLabel}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-[11px] text-sky-300/60">
        © 2026 Tilon · 한영대학교 Internal AI(iStation) 구축 사업
      </div>
    </footer>
  )
}
