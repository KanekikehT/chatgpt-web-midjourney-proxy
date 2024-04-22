import { useUserStore } from '@/store'

// 定义积分消耗
const FIXED_DEDUCTION = 0

/**
 * 每次调用扣除32积分
 * @returns 更新后的积分或错误信息
 */
export async function deductPoints(): Promise<string> {
  // console.log('扣除绘画积分中')
  const userStore = useUserStore()
  let remainingPoints = FIXED_DEDUCTION

  // 收集需要更新的套餐信息
  const updates = []

  for (const pkg of userStore.userInfo.packages) {
    if (remainingPoints <= 0)
      break

    // 检查套餐是否过期
    if (pkg.validity === '已过期')
      continue

    const availablePoints = pkg.points - pkg.usedPoints
    if (availablePoints > 0) {
      const pointsToDeduct = Math.min(availablePoints, remainingPoints)
      remainingPoints -= pointsToDeduct
      pkg.usedPoints += pointsToDeduct
      updates.push({ id: pkg.id, usedPoints: pkg.usedPoints })
    }
  }

  // 执行所有套餐更新
  for (const update of updates)
    await userStore.updatePackageInfo(update.id, { usedPoints: update.usedPoints })

  if (remainingPoints > 0)
    return '积分不足，请购买更多套餐或降低使用量。'
  else
    return '积分更新成功。'
}

export async function checkPoints(): Promise<boolean> {
  // console.log('检查绘画积分')
  const userStore = useUserStore()
  let totalAvailablePoints = 0

  for (const pkg of userStore.userInfo.packages) {
    if (pkg.validity !== '已过期')
      totalAvailablePoints += (pkg.points - pkg.usedPoints)
  }

  return totalAvailablePoints >= FIXED_DEDUCTION
}
