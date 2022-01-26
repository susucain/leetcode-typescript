/**
 * https://leetcode-cn.com/problems/edit-distance/
 * @name 最小编辑距离
 */

function minDistance(str1: string, str2: string): number {
  // dp(i, j) = {
  //   dp(i - 1, j - 1), // str1[i] = str2[j]
  //   Math.min(
  //     dp(i - 1, j - 1), // 替换
  //     dp(i, j - 1), // 插入
  //     dp(i - 1, j) // 删除
  //   ) + 1
  // }

  // dp(0, j) = j
  // dp(i, 0) = i
  const str1Len = str1.length
  const str2Len = str2.length
  const dp = [...Array(str1Len + 1)].map(() => Array(str2Len + 1))
  dp[0][0] = 0

  for (let i = 1; i < str1Len; i++) {
    dp[i][0] = i
  }

  for (let j = 1; j < str2Len; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i <= str1Len; i++) {
    for (let j = 1; j <= str2Len; j++) {
      if (str2[j] === str1[i]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, dp[i][j - 1] + 1, dp[i - 1][j] + 1)
      }
    }
  }

  return dp[str1Len][str2Len]
}

console.log(minDistance('horse', 'rps'))
console.log(minDistance('intention', 'execution'))
