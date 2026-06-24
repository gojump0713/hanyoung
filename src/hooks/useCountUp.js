import { useEffect, useRef, useState } from 'react'

// 숫자를 0(또는 from)에서 target까지 부드럽게 증가시키는 카운트업 훅
// decimals: 표시 소수 자리수 / duration: ms
export function useCountUp(target, { duration = 1200, decimals = 0, from = 0 } = {}) {
  const [value, setValue] = useState(from)
  const rafRef = useRef(0)
  const startRef = useRef(0)

  useEffect(() => {
    // 모션 최소화 설정 사용자는 즉시 표시
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }

    cancelAnimationFrame(rafRef.current)
    startRef.current = 0
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts
      const p = Math.min((ts - startRef.current) / duration, 1)
      const eased = easeOut(p)
      const current = from + (target - from) * eased
      setValue(current)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, from])

  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
