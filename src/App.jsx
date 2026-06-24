import { useMemo, useState } from 'react'
import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import Toolbar from './components/Toolbar'
import GanttChart from './components/GanttChart'
import MilestoneTimeline from './components/MilestoneTimeline'
import AssumptionList from './components/AssumptionList'
import RiskList from './components/RiskList'
import Footer from './components/Footer'
import {
  project,
  weeks,
  phases,
  tasks,
  milestones,
  assumptions,
  risks,
  owners,
  phaseByNo,
} from './data/scheduleData'
import { getProgress, getCurrentWeek } from './utils/date'

// 섹션 제목 공통 컴포넌트
function SectionTitle({ index, title, desc, id }) {
  return (
    <div id={id} className="mb-4 scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-700 text-xs font-bold text-white">
          {index}
        </span>
        <h2 className="text-lg font-bold tracking-tight text-navy-700 sm:text-xl">{title}</h2>
      </div>
      {desc && <p className="mt-1.5 pl-10 text-sm text-slate-500">{desc}</p>}
    </div>
  )
}

export default function App() {
  const today = new Date()

  const [search, setSearch] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [milestoneOnly, setMilestoneOnly] = useState(false)

  const progress = useMemo(
    () => getProgress(project.period.start, project.period.end, today),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const currentWeek = useMemo(
    () => getCurrentWeek(weeks, today),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // 간트차트에 적용할 필터링된 활동 목록
  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks.filter((t) => {
      if (milestoneOnly && !t.milestone) return false
      if (ownerFilter !== 'all' && t.owner !== ownerFilter) return false
      if (phaseFilter !== 'all' && String(t.phase) !== phaseFilter) return false
      if (q) {
        const hay = `${t.activity} ${t.deliverable}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [search, ownerFilter, phaseFilter, milestoneOnly])

  const handlePrint = () => window.print()

  const handleExportCsv = () => {
    const header = ['단계번호', '단계명', '세부활동', '산출물', '담당', '시작주차', '종료주차', '마일스톤']
    const rows = filteredTasks.map((t) => [
      t.phase,
      phaseByNo[t.phase].name,
      t.activity,
      t.deliverable,
      t.owner,
      t.postProject ? '사업종료 후' : weeks[t.startWeek - 1].id,
      t.postProject ? t.periodLabel : weeks[t.endWeek - 1].id,
      t.milestone ? '예' : '',
    ])
    const esc = (v) => `"${String(v).replaceAll('"', '""')}"`
    const csv =
      '﻿' + [header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '한영대_iStation_구축일정표.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header project={project} progress={progress} currentWeek={currentWeek} today={today} />

      <SummaryCards project={project} phases={phases} milestones={milestones} risks={risks} />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* 간트차트 */}
        <section className="mb-12">
          <SectionTitle
            index="1"
            id="gantt"
            title="8주차 구축 일정표 (Gantt Chart)"
            desc="단계별 세부 활동의 진행 기간을 주차(W1~W8)로 표시합니다. 모바일에서는 좌우로 스크롤하세요."
          />
          <Toolbar
            search={search}
            setSearch={setSearch}
            ownerFilter={ownerFilter}
            setOwnerFilter={setOwnerFilter}
            phaseFilter={phaseFilter}
            setPhaseFilter={setPhaseFilter}
            milestoneOnly={milestoneOnly}
            setMilestoneOnly={setMilestoneOnly}
            owners={owners}
            phases={phases}
            onPrint={handlePrint}
            onExportCsv={handleExportCsv}
            resultCount={filteredTasks.length}
            totalCount={tasks.length}
          />
          <GanttChart
            weeks={weeks}
            tasks={filteredTasks}
            currentIndex={currentWeek.state === 'during' ? currentWeek.index : -1}
          />
        </section>

        {/* 마일스톤 */}
        <section className="mb-12">
          <SectionTitle
            index="2"
            id="milestone"
            title="주요 마일스톤"
            desc="사업 전 구간의 핵심 의사결정·완료 시점입니다."
          />
          <MilestoneTimeline milestones={milestones} today={today} />
        </section>

        {/* 전제조건 + 리스크 (2열) */}
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle index="3" id="assumption" title="전제 조건" desc="일정 이행을 위해 충족되어야 하는 조건입니다." />
            <AssumptionList assumptions={assumptions} />
          </div>
          <div>
            <SectionTitle index="4" id="risk" title="주요 리스크 및 대응방안" desc="위험도 높음 항목을 우선 관리합니다." />
            <RiskList risks={risks} />
          </div>
        </section>
      </main>

      <Footer project={project} />
    </div>
  )
}
