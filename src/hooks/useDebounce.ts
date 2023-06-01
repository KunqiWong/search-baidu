import { useRef } from 'react'

// 防抖函数
export default function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<number>()

  function debounceFunction(this: unknown, ...args: any[]) {
    clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = undefined
      callback.apply(this, args)
    }, delay)
  }

  return debounceFunction as T
}
