/**
 * https://leetcode-cn.com/problems/longest-common-subsequence/
 * @name 最长公共子序列
 */

function longestCommonSubsequence(str1: string, str2: string): string {
  /**
   * dp[i][j] = {
   *   dp[i - 1][j - 1] + 1 // str1[i] === str2[j]
   *   Math.max(
   *     dp[i - 1][j],
   *     dp[i][j - 1]
   *   )
   * }
   */

  const str1Len = str1.length
  const str2Len = str2.length
  const dp = [...Array(str1Len + 1)].map(() => Array(str2Len + 1).fill(0))

  for (let i = 1; i <= str1Len; i++) {
    for (let j = 1; j <= str2Len; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // 得到最长的公共序列
  let len1 = str1Len
  let len2 = str2Len
  const lcsStrs: string[] = []
  // 双指针从末尾开始移动
  while (len1 > 0 && len2 > 0) {
    // 相等则双指针同时往前移动一位
    if (str1[len1 - 1] === str2[len2 - 1]) {
      lcsStrs.unshift(str1[len1 - 1])
      len1--
      len2--
    } else {
      // 往公共子序列长度大的方向移动
      if (dp[len1 - 1][len2] > dp[len1][len2 - 1]) {
        len1--
      } else {
        len2--
      }
    }
  }

  return lcsStrs.join('')
}

console.log(longestCommonSubsequence('abcde', 'ace'))
console.log(longestCommonSubsequence('abc', 'abc'))
console.log(longestCommonSubsequence('abc', 'def'))
