/**
 * https://leetcode-cn.com/problems/gaM7Ch/
 * @name 计算最少所需硬币数
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 你可以认为每种硬币的数量是无限的。
 * 示例1：
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 */

/**
 * 计算最少所需硬币数，自底向上的迭代解法
 * @param coins 硬币数额组成的数组
 * @param amount 总数
 * @returns 组成总数所需最少的硬币数
 */
function coinChange(coins: number[], amount: number) {
  // 因为组成amount所需的硬币数不可能是amount + 1，故使用amount做初始值
  const dp: number[] = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0

  // dp数组索引是总数，元素是计算这个总数所需最少的硬币数
  // dp[amout] = {
  //   0, // amout === 0
  //   Math.min(1 + dp[amount - coin])
  // }

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      // 总数减硬币值小于0，说明用此面值硬币无法组成总数，直接跳过
      if (i - coin < 0) continue
      // 也可以写到内层for循环的外面，计算出使用每个面额的硬币组成总数的硬币数的最小值
      // 别忘了dp[i]
      dp[i] = Math.min(dp[i], 1 + dp[i - coin])
    }
  }

  // 等于初始值说明没计算出结果
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}

console.log(coinChange([1, 2, 5], 11))
console.log(coinChange([1, 2, 5], 7))
console.log(coinChange([3], 2))

/**
 * 计算最少所需硬币数，自顶向下的递归解法
 * @param coins 硬币数额组成的数组
 * @param amount 总数
 * @returns 组成总数所需最少的硬币数
 */
function coinChange2(coins: number[], amount: number) {
  const dp: number[] = new Array(amount + 1).fill(amount + 1)
  dp[0] = 0

  function helper(n: number) {
    for (const coin of coins) {
      if (n - coin < 0) continue
      dp[n] = Math.min(dp[n], 1 + helper(n - coin))
    }

    return dp[n] === n + 1 ? -1 : dp[n]
  }

  return helper(amount)
}

console.log(coinChange2([1, 2, 5], 11))
console.log(coinChange2([1, 2, 5], 7))
console.log(coinChange2([3], 2))
