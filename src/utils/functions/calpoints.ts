import { useUserStore } from '@/store'

// 定义模型与积分的映射
const modelPoints = {
  'gpt-3.5-turbo': 0,
  'gpt-3.5-turbo-0125': 0,
  'gpt-4-all': 0,
  'gpt-4-32k': 0,
}

/**
 * 计算积分并更新套餐状态
 * @param model 模型名称
 * @returns 更新后的积分或错误信息
 */
export async function calculateAndUpdatePoints(model: string): Promise<string> {
  const userStore = useUserStore()
  const baseRate = modelPoints[model] || 0
  let remainingPoints = baseRate

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

export async function checkSufficientPoints(model: string): Promise<boolean> {
  const userStore = useUserStore()
  const neededPoints = modelPoints[model] || 1
  let totalAvailablePoints = 0

  for (const pkg of userStore.userInfo.packages) {
    if (pkg.validity !== '已过期')
      totalAvailablePoints += (pkg.points - pkg.usedPoints)
  }

  return totalAvailablePoints >= neededPoints
}
