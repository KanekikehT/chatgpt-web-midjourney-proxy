import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

/** 手机尺寸 min-width: 640px */
export function useBasicLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')

  return { isMobile }
}

/** 平板尺寸 min-width: 768px */
export function useMediumLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMedium = breakpoints.greaterOrEqual('md') // 或使用 `grterOrEqualea` 如果 `greater` 也不可用

  return { isMedium }
}

/** 电脑尺寸 min-width: 1024px */
export function useLargeLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isLarge = breakpoints.greater('lg') // 或使用 `grterOrEqualea` 如果 `greater` 也不可用

  return { isLarge }
}

/** 大屏电脑尺寸 min-width: 1280px */
export function useXLScreenLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isXL = breakpoints.greater('xl') // 或使用 `grterOrEqualea` 如果 `greater` 也不可用

  return { isXL }
}

/** 电视尺寸 min-width: 1536px */
export function useTVLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isTV = breakpoints.greaterOrEqual('2xl') // 或使用 `grterOrEqualea` 如果 `greater` 也不可用

  return { isTV }
}
