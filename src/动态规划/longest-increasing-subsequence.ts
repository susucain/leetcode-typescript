/**
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/
 * @name 最长递增子序列
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 */

/**
 * 自底向上，查出数组最长递增子序列的长度
 * @param nums 数组
 * @returns 数组最长递增子序列的长度
 */
function lengthOfLIS(nums: number[]): number {
  // i就是数组索引，元素是以nums[i]结尾的最长递增子序列长度
  // 以nums[i]结尾的最长递增子序列长度就是，所有以比nums[i]结尾小的最长递增子序列 + 1
  // dp(i) = Max(dp(j)) + 1, nums[i] > nums[j]

  const dp = Array(nums.length).fill(1)

  for (let i = 0, len = nums.length; i < len; i++) {
    // 递增子序列必须是按顺序的，以nums[0]结尾的子序列最长只能是1，因为它前面没有其他数
    // 所以以nums[i]结尾的最长递增子序列，就是以它前面比他小的数结尾的子序列长度 + 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], 1 + dp[j])
      }
    }
  }

  return Math.max(...dp)
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
